const express = require('express');
const app = express();
const router = express.Router(); 

router
.route('/')
.get((req, res) => {
  res.status(200).send('Welcome to Titan.  Stay Greedy.');
})

router.get('/status', (req, res) => {
  console.log('Getting application status ...');
  res.status(200).send('Titan is up.');
});

module.exports = router