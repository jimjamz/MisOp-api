const express = require('express');
const app = express();
const router = express.Router(); 

router
.route('/weather')
.get((req, res) => {
  console.log('Getting weather for Titan ...');
  res.status(200).send('Harsh and brutal lightning storms.  As always.');
})

module.exports = router;