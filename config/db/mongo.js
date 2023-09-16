const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  url: "mongodb+srv://" 
  + process.env.MONGO_USER + ":" 
  + process.env.MONGO_PASS + "@" 
  + process.env.MONGO_CLUSTER + ".mongodb.net/"
  + process.env.MONGO_DATABASE + "?retryWrites=true&w=majority"
}