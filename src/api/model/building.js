const mongoose = require('mongoose');

// why do I have to create the connection string in each model for sequelize?
const postgres = require('../../../config/postgres');
const pgUrl = postgres.url;
const { Sequelize, DataTypes, UUID } = require('sequelize');
const sequelize = new Sequelize(pgUrl);

const dotenv = require('dotenv');
dotenv.config();

// mongoose model
const buildingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a pilot name"]
    },
    open: {
      type: Boolean,
      default: true
    },
    owner: {
      type: UUID,
      default: null,
      required: true
    },
    crater: {
      type: String,
      enum : ['Alpha','Downtown', 'Gamma', 'Highrise', 'Mines', 'Port', 'Reservoir'],
      default: 'Downtown',
      required: true
    },
    faction: {
      type: String,
      enum : ['Klamp-G', 'Lazarus', 'None', 'Skinners', 'Scrubbers'],
      default: 'None',
      required: true
    },
    type: {
      type: String,
      enum : ['Monorail Depot', 'Pilot', 'Pirate', 'Police', 'Trader', 'Trading Post'],
      default: 'Pilot',
      required: true
    },
    relationship_lazarus: {
      type: Number,
      default: 0,
      required: true
    },
    relationship_klamp: {
      type: Number,
      default: 0,
      required: true
    },
    relationship_police: {
      type: Number,
      default: 0,
      required: true
    },
    bays: {
      type: Number,
      default: 8,
      required: true
    },
  },
  {
    timestamps: true
  }
);

// sequelize model
const buildingModel = sequelize.define('Building', 
  {
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true},
      allowNull: false
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    owner: {
      type: DataTypes.UUID,
      defaultValue: null,
      allowNull: true
    },
    crater: {
      type: DataTypes.ENUM('Alpha','Downtown', 'Gamma', 'Highrise', 'Mines', 'Port', 'Reservoir'),
      defaultValue: 'Downtown',
      allowNull: false
    },
    faction: {
      type: DataTypes.ENUM('Klamp-G', 'Lazarus', 'None', 'Skinners', 'Scrubbers'),
      required: true
    },
    type: {
      type: DataTypes.ENUM('Monorail Depot', 'Pilot', 'Pirate', 'Police', 'Trader', 'Trading Post'),
      required: true
    },
    relationship_lazarus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    relationship_klamp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    relationship_police: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    moths: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: true,
      // references: {
      //   model: mothModel,
      //   key: mothModel.mothId,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // }
    },
    bays: {
      type: DataTypes.INTEGER,
      defaultValue: 8,
      allowNull: false
    },
  }
);

const Building = mongoose.model('Building', buildingSchema);


module.exports = {
  Building,
  buildingModel
}