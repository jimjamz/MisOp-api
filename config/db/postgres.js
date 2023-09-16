const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  url: "postgres://" 
  + process.env.POSTGRES_USER + ":" 
  + process.env.POSTGRES_PASS + "@" 
  + "trumpet.db.elephantsql.com/"
  + process.env.POSTGRES_DATABASE
}
