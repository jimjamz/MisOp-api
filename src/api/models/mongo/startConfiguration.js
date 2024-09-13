const { UUID } = require('mongodb');
const mongoose = require('mongoose');
const moStartConfigSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum : ['Trader', 'Scavenger', 'Aggressor'],
      required: [true, "Please select a Start Configuration"],
      unique: true
    },
    description: {
      type: String,
      required: false
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
    moth: {
      type: UUID,
      required: false
    },
    cargoPod: {
      type: UUID,
      required: false
    }
  },
  {
    timestamps: true
  }
);
const moStartConfig = mongoose.model('Crater', moStartConfigSchema);

module.exports = {
  moStartConfig
}
