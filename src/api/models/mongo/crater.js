const mongoose = require('mongoose');
const moCraterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum : ['Alpha','Downtown', 'Gamma', 'Haven', 'Highrise', 'Mines', 'Port', 'Reservoir', 'Riverside'],
      required: [true, "Please select a crater"],
      unique: true
    },
    faction: {
      type: String,
      enum : ['EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'],
      default: 'Flyers',
      required: true
    },
    connectingCraters: {
      type: Array,
      required: false
    },
    hasMonorail: {
      type: Boolean,
      required: true
    },
  },
  {
    timestamps: true
  }
);
const moCrater = mongoose.model('Crater', moCraterSchema);

module.exports = {
  moCrater
}
