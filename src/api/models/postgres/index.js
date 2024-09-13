'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
// const process = require('process');
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

/*
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
*/

const postgres = require('../../../../config/db/postgres');
const pgUrl = postgres.url;
const Sequelize = require('sequelize');
let sequelize = new Sequelize(pgUrl, {
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// for each model, add to the sequelize instance
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      // strip the extension off the filename to get the model name. basename is index.js.
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    console.log('model to be added to sequelize: ',db[model.name]);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    console.log(modelName + ' has an associate() method');
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db
