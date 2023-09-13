// express
const express = require('express');
const router = express.Router;

// db
const mongoDB = require('./config/mongoDB');
const mongoose = require('mongoose');

const pg = require('pg');
const postgres = require('./config/postgres');
const pgClientClass = pg.Client;
const pgUrl = postgres.url;
const pgClient = new pgClientClass(pgUrl);
const Sequelize = require('sequelize');
const sequelize = new Sequelize(pgUrl);

// app
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// routes
const indexRoute = require('./src/api/routes/index');
const pilotRoute = require('./src/api/routes/pilot');
const titanRoute = require('./src/api/routes/titan');

app.use(bodyParser.json({}));
app.use('/', indexRoute);
app.use('/pilot', pilotRoute);
app.use('/titan', titanRoute);

// connect MongoDB and run the app
async function run() {
  try {
    await mongoose.connect(mongoDB.url)
    .then(() => {
      console.log('Connected to MongoDB.');
      console.log(mongoDB.url);
      console.log(mongoose.connection.readyState); // 1 is connected, 0 is disconnected.
      app.listen(port, () => {
        console.log("Hello, Titan.  Live on port " + port);
      });
    })
  }
  finally {
    // Ensures that the client will close when you finish/error
    await mongoose.connection.close;
  }
}
run().catch(console.dir);

// connect Postgres
async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Postgres connection via Sequelize has been established successfully.');
  } catch (error) {
    console.error('Sequelize is unable to connect to the Postgres database:', error);
  }
}
connect();
