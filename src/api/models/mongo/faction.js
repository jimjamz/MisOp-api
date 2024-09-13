const mongoose = require('mongoose');
const moFactionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum : ['EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'],
      required: [true, "Faction must have a Name."],
      unique: true
    },
    friend: {
      type: String,
      enum : ['EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'],
      allowNull: true,
      required: false
    },
    enemy: {
      type: String,
      enum : ['EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'],
      allowNull: true,
      required: false
    },
  },
  {
    timestamps: true
  }
);
const moFaction = mongoose.model('Faction', moFactionSchema);

module.exports = {
  moFaction
}
