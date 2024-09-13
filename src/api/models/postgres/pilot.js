const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pgPilot extends Model {
    // helper methods here
    static associate(models) {
      // define association here
    }
  };
  pgPilot.init(
  {
    id: {
      type: DataTypes.UUID,
      validate: {notEmpty: true},
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    startConfiguration: {
      type: DataTypes.ENUM('Trader', 'Scavenger', 'Aggressor'),
      allowNull: false,
      defaultValue: "Trader"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Pilot must have a Name.' },
        notEmpty: { msg: 'Pilot Name must not be empty.' },
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sat in the pilot seat of a moth.name, docked in location.name"
    },
    cash: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10000
    },
    location: {
      type: DataTypes.ARRAY(DataTypes.STRING, DataTypes.STRING),
      allowNull: false,
      defaultValue: ["Downtown", "God Hangar"]
    },
    buildings: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
      // references: {
      //   model: pgBuilding,
      //   key: name,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // },
    },
    moths: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      defaultValue: []
      // references: {
      //   model: pgMoth,
      //   key: id,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // }
    },
    enemies: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      defaultValue: []
      // references: {
      //   model: pgPilot,
      //   key: id,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // },
    },
    faction: {
      type: DataTypes.ENUM('EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'),
      allowNull: false,
      defaultValue: 'Flyers',
      validate: {
        notNull: { msg: 'Faction must have a Name.' },
        notEmpty: { msg: 'Faction Name must not be empty.' },
      },
    },
    relationship_lazarus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    relationship_klamp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    relationship_police: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  },
  {
    sequelize, modelName: 'Pilot'
  });
  return pgPilot;
};
