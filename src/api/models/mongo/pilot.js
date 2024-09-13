const mongoose = require('mongoose');
const pilotSchema = mongoose.Schema(
  {
    startConfiguration: {
      type: String,
      enum: ['Trader', 'Scavenger', 'Aggressor'],
      default: "Trader",
      required: true
    },
    name: {
      type: String,
      required: [true, "Please enter a pilot name"],
      unique: true
    },
    status: {
      type: String,
      default: "Sat in the pilot seat of a moth.name, docked in location.name",
      required: true
    },
    cash: {
      type: Number,
      default: 10000,
      required: true
    },
    location: {
      type: Array,
      default: ["Downtown", "God Hangar"],
      required: true
    },
    buildings: {
      type: Array,
      default: [],
      required: true
    },
    moths: {
      type: Array,
      default: [],
      required: true
    },
    enemies: {
      type: Array,
      default: [],
      required: true
    },
    faction: {
      type: String,
      enum : ['EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'],
      default: 'Flyers',
      required: [true, "Faction must have a Name."]
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
    dead: {
      type: Boolean,
      default: false,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const moPilot = mongoose.model('Pilot', pilotSchema);

module.exports = {
  moPilot
}
