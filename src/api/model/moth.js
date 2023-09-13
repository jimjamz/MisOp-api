const mongoose = require('mongoose');

// why do I have to create the connection string in each model for sequelize?
const postgres = require('../../../config/postgres');
const pgUrl = postgres.url;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(pgUrl);

const dotenv = require('dotenv');
dotenv.config();

// mongoose model
const mothSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum : ['Silver-Y','Hawk', 'Neo Tiger', 'Deaths Head', 'Police', 'Moon', 'Swallow'],
      default: 'Silver-Y',
      required: true
    },
    shields: {
      type: Number,
      default: 100,
      required: true
    },
    hull: {
      type: Number,
      default: 100,
      required: true
    },
    engine: {
      type: Number,
      default: 100,
      required: true
    },
    electrics: {
      type: Number,
      default: 100,
      required: true
    },
    fuel: {
      type: Number,
      default: 100,
      required: true
    },
    hull: {
      type: Number,
      default: 100,
      required: true
    },
    cargoPod: {
      type: String,
      enum : ['Small'],
      default: null,
      required: true
    },
    battery: {
      type: String,
      enum : ['Cell #1', 'Cell #2'],
      default: 'Cell #1',
      required: true
    },
    occupied: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// sequelize model
const mothModel = sequelize.define('Moth', 
  {
    mothId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('Silver-Y','Hawk', 'Neo Tiger', 'Deaths Head', 'Police', 'Moon', 'Swallow'),
      defaultValue: 'Silver-Y',
      allowNull: false
    },
    shields: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false
    },
    hull: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false
    },
    engine: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false
    },
    electrics: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false
    },
    fuel: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false
    },
    hull: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false
    },
    cargoPod: {
      type: DataTypes.ENUM('Small'),
      defaultValue: 'Small',
      allowNull: false
    },
    battery: {
      type: DataTypes.ENUM('Cell #1, Cell #2'),
      defaultValue: 'Cell #1',
      allowNull: false
    },
    occupied: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  }
);

const Moth = mongoose.model('Moth', mothSchema);

module.exports = {
  Moth,
  mothModel
}
