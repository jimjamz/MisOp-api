const mongoose = require('mongoose');

// why do I have to create the connection string in each model for sequelize?
const postgres = require('../../../config/db/postgres');
const pgUrl = postgres.url;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(pgUrl);

// mongoose model
const pilotSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a pilot name"]
    },
    status: {
      type: String,
      default: "ACTIVE",
      required: true
    },
    score: {
      type: Number,
      default: 0,
      required: true
    },
    cash: {
      type: Number,
      default: 10000,
      required: true
    },
    location: {
      type: String,
      default: "God Hangar",
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
    moths: {
      type: Array,
      default: [],
      required: true
    },
    buildings: {
      type: Array,
      default: [],
      required: true
    },
    disabled: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const moPilotModel = mongoose.model('Pilot', pilotSchema);

// sequelize model
const pgPilotModel = sequelize.define('Pilot', 
  {
    id: {
      type: DataTypes.UUID,
      validate: {notEmpty: true},
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true},
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "ACTIVE",
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    cash: {
      type: DataTypes.INTEGER,
      defaultValue: 10000,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: "God Hangar",
      allowNull: false,
    },
    relationship_lazarus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    relationship_klamp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    relationship_police: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    moths: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
      // references: {
      //   model: mothModel,
      //   key: mothModel.mothId,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // }
    },
    buildings: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
      // references: {
      //   model: buildingModel,
      //   key: name,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // },
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  }
);

// update the pilot Postgres model on server start
pgPilotModel.sync({ alter: true }).then((data) => {
  console.log("Syncing Pilot table ...");
}).catch((error) => {
  console.log("An error occurred updating the Pilot table.");
});

module.exports = {
  moPilotModel,
  pgPilotModel
}