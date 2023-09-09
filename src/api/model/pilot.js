const mongoose = require('mongoose');

const pilotSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a pilot name"]
    },
    status: {
      type: String,
      default: "ACTIVE"
    },
    score: {
      type: Number,
      default: 0
    },
    cash: {
      type: Number,
      default: 10000
    },
    location: {
      type: String,
      default: "God Hangar"
    },
    relationship_lazarus: {
      type: Number,
      default: 0
    },
    relationship_klamp: {
      type: Number,
      default: 0
    },
    relationship_police: {
      type: Number,
      default: 0
    },
    moths: {
      type: Array,
      default: []
    },
    buildings: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

const Pilot = mongoose.model('Pilot', pilotSchema);

module.exports = Pilot