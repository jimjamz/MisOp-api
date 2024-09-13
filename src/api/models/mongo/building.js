const mongoose = require('mongoose');
const moBuildingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a pilot name"]
    },
    crater: {
      type: String,
      enum : ['Alpha','Downtown', 'Gamma', 'Haven', 'Highrise', 'Mines', 'Port', 'Reservoir', 'Riverside'],
      default: 'Downtown',
      required: true
    },
    faction: {
      type: String,
      enum : ['EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'],
      default: 'EstateAgents',
      required: true
    },
    moths: {
      type: Array,
      default: [],
      required: true
    },
    owner: {
      type: String,
      default: null,
      required: false
    },
    pilots: {
      type: Array,
      default: [],
      required: true
    },
    bays: {
      type: Number,
      default: 8,
      required: true
    },
    baysOccupied: {
      type: Number,
      default: 0,
      required: true
    },
    cash: {
      type: Number,
      default: 0,
      required: true
    },
    lightWell: {
      type: Boolean,
      default: false,
      required: true
    },
    monorailTerminal: {
      type: Boolean,
      default: false,
      required: true
    },
    open: {
      type: Boolean,
      default: true,
      required: true
    },
    private: {
      type: Boolean,
      default: true,
      required: true
    },
    repairCost: {
      type: Number,
      default: 0,
      required: true
    },
    repairDroids: {
      type: Boolean,
      default: false,
      required: true
    },
    salesSystem: {
      type: Boolean,
      default: false,
      required: true
    },
    stock: {
      type: Array,
      default: [],
      required: true
    }
  },
  {
    timestamps: true
  }
);
const moBuilding = mongoose.model('Building', moBuildingSchema);

module.exports = {
  moBuilding
}
