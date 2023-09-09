// express
const express = require('express');
const router = express.Router;

// db
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoDB = require('./config/mongoDB');
const mongoose = require('mongoose');

const pg = require('pg');
const { pgDB } = require('pg/lib/defaults');

const pgClientClass = pg.Client;
const pgUrl = "";
const pgClient = new pgClientClass(pgUrl);

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

// ### MONGODB
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const mongo_client = new MongoClient(mongoDB.url,  {
//   serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//   }
// }
// );

// async function run() {
//   try {
//     // specify details of database and test
//     const database = mongo_client.db('MisplacedOptimism');
//     const testCollection = database.collection('test');
//     const query = { name: { $regex: "jim" } };
//     const cursor = testCollection.find(query);

//     // Send a ping to confirm a successful connection
//     await mongo_client.db('MisplacedOptimism').command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     await mongo_client.db('MisplacedOptimism').find

//     // Print a message if no documents were found
//     if ((await testCollection.countDocuments(query)) === 0) {
//       console.log("No documents found!");
//     };

//     // Print returned documents
//     for await (const doc of cursor) {
//       console.dir(doc);
//     };
//     // require('./app/routes/pilot.js')(app, database);
//     app.listen(port, () => {
//       console.log("Hello, Titan.  Live on port " + port);
//     });
//   }
//   finally {
//     // Ensures that the client will close when you finish/error
//     await mongo_client.close();
//   }
// }
// run().catch(console.dir);

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


// ### POSTGRES
// async function connect(pgClient) {
//   try {
//     await pgClient.connect();
//     console.log('Postgres client connected.');
  
//     const {rows} = await pgClient.query(' ');
//     console.table(rows);
//     await client.end();
//   }
//   catch (err) {
//     console.log(err);
//   }
//   finally {
//     await client.end();
//   }
// }
