const dotenv = require('dotenv');
dotenv.config();

const dbChoice = process.env.DB_CHOICE;
let dbMongo = false;
let dbPostgres = false;
if (dbChoice === 'mongo') {
  dbMongo = true;
}
else if (dbChoice === 'postgres') {
  dbPostgres = true;
}

module.exports = {
  dbChoice,
  dbMongo, 
  dbPostgres
}
