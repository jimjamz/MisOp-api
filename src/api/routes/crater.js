const express = require('express');
const router = express.Router();
const { sequelize } = require('../models/postgres');
let pgCrater = sequelize.models.Crater;
const { moCrater } = require('../models/mongo/crater');
const { dbMongo, dbPostgres } = require('../../../config/db/db');

let crater, craters = function(){};

async function getCraters (req, res, next) {
  try {
    // use only model for database of choice
    if (dbMongo) {
      craters = await moCrater.find({});
    }
    else if (dbPostgres) {
      craters = await pgCrater.findAll({});
    }
    console.log('Getting list of Craters ...');
    res.status(200).json(craters);
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function deleteCraters (req, res, next) {
  try {
    // use only model for database of choice
    if (dbMongo) {
      craters = await moCrater.deleteMany({});
    }
    else if (dbPostgres) {
      craters = await pgCrater.destroyAll({});
    }
    console.log('Deleting all Craters ...');
    res.status(204).json(craters);
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function getCrater (req, res, next) {
  try {
    const { name } = req.params;
    if (dbMongo) {
      crater = await moCrater.findOne({ "name": name })
    }
    else if (dbPostgres) {
      crater = await pgCrater.findOne({ where: { name: name } });
    }
    console.log('Crater to be fetched:', name);
    if (!crater) {
      res.status(404).json({message: `Cannot find Crater with name, ${name}`});
    }
    else {
      res.status(200).json(crater);
      console.log(`Crater, ${crater.name} found.`);
    }
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function createCrater (req, res, next) {
  try {
    if (dbMongo) {
      crater = await moCrater.create(req.body);
    }
    else if (dbPostgres) {
      crater = await pgCrater.create(req.body);
    }
    console.log('Crater to be created:', req.body.name);
    res.status(200).json(crater);
    console.log(`Crater, ${crater.name} created.`);
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

async function deleteCrater (req, res, next) {
  try {
    const { name } = req.params;
    if (dbMongo) {
      crater = await moCrater.findOneAndDelete({ "name": name })
    }
    else if (dbPostgres) {
      crater = await pgCrater.destroy({ where: { name: name } });
    }
    console.log('Crater to be deleted:', req.body.name);
    if (!crater) {
      res.status(404).json({message: `Cannot find Crater with name, ${name}`});
    }
    else {
      res.status(204).json(crater);
      console.log(`Crater, ${name} deleted.`);
    }
  }
  catch (error) {
    dbErrorMessage(res, error);
  }
  next();
}

router
.route('/')
.get(getCraters, (req, res) => {
})
.post(createCrater, (req, res) => {
})
.delete(deleteCraters, (req, res) => {
})

router
.route('/:name')
.get(getCrater, (req, res) => {
})
.delete(deleteCrater, (req, res) => {
})

function dbErrorMessage (response, error) {
  console.log(error.message);
  response.status(500).json({message: error.message});
}

module.exports = router;
