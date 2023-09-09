const express = require('express');
const pg_db = require("pg/lib/defaults");
const mongo_db = require('../../../config/mongoDB');

const Pilot = require('../model/pilot');

const router = express.Router();

const pilots = [
  {
    name: "Zero Cool",
    status: true,
    score: 0,
    cash: 10000,
    location: "God Hangar",
    relationship_lazarus: 0,
    relationship_klamp: 0,
    relationship_police: 0,
    moths: {},
    buildings: {},
    disabled: true
  }
];

function originalCreatePilot (req, res, next) {
  let pilot = req.body;
  console.log('Pilot to be created: ', pilot);
  // db.db('MisplacedOptimism').collection('Pilot').insertOne(pilot, (error, dbResult) => {
  //   if (error) {
  //     res.send({'Error': 'An error has occurred.  The pilot cannot be created.'});
  //   }
  //   else {
  //     res.send(dbResult.ops[0]);
  //   }
  // })
  res.status(201).send('Pilot, ' + pilot + ' created.');
  next();
}
  
async function getPilots (req, res, next) {
  // try {
  //   const pilots = await Pilot.find({});
  //   res.status(200).json(pilots);
  // }
  // catch {
  //   dbErrorMessage(res);
  // }
  res.status(200).send('Here will be the list of pilots.');
  next();
}

async function getPilot (req, res, next) {
  // try {
  //   const pilotId = req.params;
  //   const pilot = await Pilot.findById({pilotId});
  //   res.status(200).json(pilot);
  // }
  // catch {
  //   dbErrorMessage(res);
  // }
  res.status(200).send('A single pilot will be returned.');
  next();
}

async function createPilot (req, res, next) {
  try {
    const pilot = await Pilot.create(req.body);
    console.log('Pilot to be created: ', req.body.name);
    res.status(200).json(pilot);
    // res.send('Pilot, ' + pilot.name + ' created.');
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  // res.status(201).send('Pilot will be added.');
  next();
}

async function updatePilot (req, res, next) {
  // try {
  //   const pilotId = req.params;
  //   let pilot = await Pilot.findByIdAndUpdate(id, req.body);
  //   console.log('Pilot to be updated: ', req.body.name);
  //   if (!pilot) {
  //     return res.status(404).json({message: `Cannot find pilot with ID, ${pilotId}`});
  //   }
  //   res.status(201).json(pilot);
  //   res.send('Pilot, ' + pilot.name + ' updated.');
  // }
  // catch {
  //   dbErrorMessage(res);
  // }
  res.status(201).send('Pilot will be updated.');
  next();
}

async function deletePilot (req, res, next) {
  // try {
  //   const pilotId = req.params;
  //   let pilot = await Pilot.findByIdAndDelete(id, req.body);
  //   console.log('Pilot to delete: ', req.body.name);
  //   if (!pilot) {
  //     return res.status(404).json({message: `Cannot find pilot with ID, ${pilotId}`});
  //   }
  //   res.status(204).json(pilot);
  //   res.send('Pilot, ' + pilot.name + ' deleted.');
  // }
  // catch {
  //   dbErrorMessage(res);
  // }
  res.status(204).send('Pilot will be deleted.');
  next();
}

router
.route('/')
.get(getPilots, (req, res) => {
  console.log('Getting list of Pilots ...');
})
.post(createPilot, (req, res) => {
  console.log('Creating Pilot ...');
})


router
.route('/:id')
.get(getPilot, (req, res) => {
  console.log('Fetching Pilot ...');
})
.post(updatePilot, (req, res) => {
  console.log('Updating Pilot ...');
})
.delete(deletePilot, (req, res) => {
  console.log('Deleting Pilot ...');
})

function dbErrorMessage (response, error) {
  console.log(error.message);
  response.status(500).json({message: error.message});
}

module.exports = router;
