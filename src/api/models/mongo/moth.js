const mongoose = require('mongoose');
const moMothSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum : ['Silver-Y','Hawk', 'Neo Tiger', 'Deaths Head', 'Police', 'Moon', 'Swallow'],
      default: 'Silver-Y',
      required: true
    },
    cargoPod: {
      type: String,
      enum : ['Small', 'Medium', 'Large', 'X-Large'],
      default: null,
      required: false
    },
    cell: {
      type: String,
      enum : ['Cell #1', 'Cell #2', 'Cell #3', 'Cell #4'],
      default: 'Cell #1',
      required: true
    },
    engine: {
      type: String,
      enum : ['Engine #1', 'Engine #2', 'Engine #3'],
      default: 'Engine #1',
      required: true
    },
    pilot: {
      type: UUID,
      required: false
    },
    passenger: {
      type: UUID,
      required: false
    },
    weapons: {
      type: Array,
      default: [],
      required: true
    },
    statsShields: {
      type: Number,
      default: 100,
      required: true
    },
    statsStructure: {
      type: Number,
      default: 100,
      required: true
    },
    statsEngine: {
      type: Number,
      default: 100,
      required: true
    },
    statsCpu: {
      type: Number,
      default: 100,
      required: true
    },
    statsPower: {
      type: Number,
      default: 100,
      required: true
    },
    statsWeapons: {
      type: Number,
      default: 100,
      required: true
    },
    droneFitted: {
      type: Boolean,
      default: false,
      required: true
    },
    occupied: {
      type: Boolean,
      default: false,
      required: true
    },
    numOfWeapons: { // weapons.length()
      type: Number,
      default: 5,
      required: true
    },
    softwareVersion: {
      type: Number,
      default: 1,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const moMoth = mongoose.model('Moth', moMothSchema);

module.exports = {
  moMoth
}
