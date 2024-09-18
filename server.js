// express
const express = require('express');

// db
const { dbMongo, dbPostgres } = require('./config/db/db');
const mongoDB = require('./config/db/mongo');
const mongoose = require('mongoose');
const { sequelize } = require('./src/api/models/postgres');
const pgStoreProc = require('./config/db/storeproc-postgres');
const moStoreProc = require('./config/db/storeproc-mongo');
// model tests
/*
let pgPilot = sequelize.models.Pilot;
const { moPilot } = require('./src/api/models/mongo/pilot');
let moPilots, pgPilots = function(){};
*/

// app
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// routes
const indexRoute = require('./src/api/routes');
const craterRoute = require('./src/api/routes/crater');
const pilotRoute = require('./src/api/routes/pilot');
const titanRoute = require('./src/api/routes/titan');
app.use(bodyParser.json({}));
app.use('/', indexRoute);
app.use('/crater', craterRoute);
app.use('/pilot', pilotRoute);
app.use('/titan', titanRoute);

async function main() {
  try {
    // connect MongoDB
    await mongoose.connect(mongoDB.url)
    .then(() => {
      console.log('Connected to MongoDB.');
      console.log('Connection state: ', mongoose.connection.readyState); // 1 is connected, 0 is disconnected.
    });
    // connect Postgres
    await sequelize.authenticate()
    .then(() => {
      console.log('Postgres connection via Sequelize has been established successfully.');
      return true;
    });
    await sequelize.sync({alter: true})
    .then((data) => {
      console.log("Syncing Postgres tables ...");
    }).catch((error) => {
      console.log("An error occurred updating the Postgres tables.");
    })
    .then(() => {
      app.listen(port, () => {
        console.log("Hello, Titan.  Live on port " + port);
      });
    });
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
  finally {
    // Ensures that the client will close when you finish/error
    // Don't do this for either - it immediately closes the connection manager
    // await mongoose.connection.close();
    // await sequelize.close();

    if (dbMongo) {
      moStoreProc.moTearDownTitan()
      .then(() => {
        moStoreProc.moCreateFactions();
        moStoreProc.moCreateCraters();
        moStoreProc.moCreateBuildings();
        moStoreProc.moCreateStartConfigs();
        moStoreProc.moCreatePilots();
      });
    }
    else if (dbPostgres) {
      pgStoreProc.pgTearDownTitan()
      .then(() => {
        pgStoreProc.pgCreateFactions();
        pgStoreProc.pgCreateCraters();
        pgStoreProc.pgCreateBuildings();
        pgStoreProc.pgCreateStartConfigs();
        pgStoreProc.pgCreatePilots();
      });
    }
  };
}
main().catch(console.dir);

module.exports = {
  app
}
