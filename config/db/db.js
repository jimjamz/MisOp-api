const dotenv = require('dotenv');
dotenv.config();

const dbChoice = process.env.DB_CHOICE;
let dbMongo = false;
let dbPostgres = false;
if (process.env.DB_CHOICE === 'mongo') {
  dbMongo = true;
}
else if (process.env.DB_CHOICE === 'postgres') {
  dbPostgres = true;
}

module.exports = {
  dbMongo, 
  dbPostgres
}