const express = require('express');
const pg_db = require("pg/lib/defaults");
const mongo_db = require('../../../config/mongoDB');

const router = express.Router();
const Pilot = require('../model/pilot');

async function getPilots (req, res, next) {
  try {
    const pilots = await Pilot.find({});
    console.log('Getting list of Pilots ...');
    res.status(200).json(pilots);
  }
  catch {
    dbErrorMessage(res);
  }
  next();
}

async function getPilot (req, res, next) {
  try {
    const {id} = req.params;
    const pilot = await Pilot.findById(id);
    console.log('Pilot to be fetched:', id);
    if (!pilot) {
      res.status(404).json({message: `Cannot find pilot with ID, ${id}`});
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
    const pilot = await Pilot.create(req.body);
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
    const {id} = req.params;
    const pilot = await Pilot.findByIdAndUpdate(id, req.body);
    console.log('Pilot to be updated:', req.body.name);
    if (!pilot) {
      res.status(404).json({message: `Cannot find pilot with ID, ${id}`});
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
    const {id} = req.params;
    let pilot = await Pilot.findByIdAndDelete(id, req.body);
    console.log('Pilot to be deleted:', req.body.name);
    if (!pilot) {
      return res.status(404).json({message: `Cannot find pilot with ID, ${id}`});
    }
    else {
      res.status(204).json(pilot);
      console.log(`Pilot ${id} : ${pilot.name} deleted.`);
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
