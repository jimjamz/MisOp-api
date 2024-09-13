const express = require('express');
const router = express.Router(); 
const db = require('../../../config/db/db');

let databaseChoice = db.dbChoice;

router
.route('/')
.get((req, res) => {
  res.status(200).send('Welcome to Titan.  Stay Greedy.');
})

router.get('/status', (req, res) => {
  console.log('Getting application status ...');
  res.status(200).send('Titan is up.  Database type is ' + databaseChoice + '.');
});

module.exports = router