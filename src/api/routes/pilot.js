const express = require('express');
const router = express.Router();
const { sequelize } = require('../models/postgres');
let pgPilot = sequelize.models.Pilot;
const { moPilot } = require('../models/mongo/pilot');
const { dbMongo, dbPostgres } = require('../../../config/db/db');

let pilot, pilots = function(){};

async function getPilots (req, res, next) {
  try {
    // use only model for database of choice
    if (dbMongo) {
      pilots = await moPilot.find({});
    }
    else if (dbPostgres) {
      pilots = await pgPilot.findAll({});
    }
    console.log('Getting list of Pilots ...');
    res.status(200).json(pilots);
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function deletePilots (req, res, next) {
  try {
    // use only model for database of choice
    if (dbMongo) {
      pilots = await moPilot.deleteMany({});
    }
    else if (dbPostgres) {
      pilots = await pgPilot.destroyAll({});
    }
    console.log('Deleting all Pilots ...');
    res.status(204).json(pilots);
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function getPilot (req, res, next) {
  try {
    const { id } = req.params;
    if (dbMongo) {
      pilot = await moPilot.findById(id);
    }
    else if (dbPostgres) {
      pilot = await pgPilot.findByPk(id);
    }
    console.log('Pilot to be fetched:', id);
    if (!pilot) {
      res.status(404).json({message: `Cannot find Pilot with ID, ${id}`});
    }
    else {
      res.status(200).json(pilot);
      console.log(`Pilot ${id} : ${pilot.name} found.`);
    }
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function createPilot (req, res, next) {
  try {
    if (dbMongo) {
      pilot = await moPilot.create(req.body);
    }
    else if (dbPostgres) {
      pilot = await pgPilot.create(req.body);
    }
    console.log('Pilot to be created:', req.body.name);
    res.status(200).json(pilot);
    console.log(`Pilot ${pilot.name} created.`);
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function updatePilot (req, res, next) {
  try {
    const { id } = req.params;
    if (dbMongo) {
      pilot = await moPilot.findByIdAndUpdate(id, req.body);
    }
    else if (dbPostgres) {
      pilot = await pgPilot.update(req.body, { where: { id: id }});
    }
    console.log('Pilot to be updated:', req.body.name);
    if (!pilot) {
      res.status(404).json({message: `Cannot find Pilot with ID, ${id}`});
    }
    else {
      res.status(201).json(pilot);
      console.log(`Pilot ${id} : ${pilot.name} updated.`);
    }
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function deletePilot (req, res, next) {
  try {
    const { id } = req.params;
    if (dbMongo) {
      pilot = await moPilot.findByIdAndDelete(id, req.body);
    }
    else if (dbPostgres) {
      pilot = await pgPilot.destroy({ where: { id: id }});
    }
    if (!pilot) {
      res.status(404).json({message: `Cannot find Pilot with ID, ${id}`});
    }
    else {
      res.status(204).json(pilot);
      console.log(`Pilot ${id} deleted.`);
    }
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

router
.route('/')
.get(getPilots, (req, res) => {
})
.post(createPilot, (req, res) => {
})
.delete(deletePilots, (req, res) => {
})

router
.route('/:id')
.get(getPilot, (req, res) => {
})
.put(updatePilot, (req, res) => {
})
.delete(deletePilot, (req, res) => {
})

function dbErrorMessage (response, error) {
  console.log(error.message);
  response.status(500).json({message: error.message});
}

module.exports = router;
