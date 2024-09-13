const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pgBuilding extends Model {
    // helper methods here
    static associate(models) {
      // define association here
    }
  };
pgBuilding.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        notNull: { msg: 'Building must have a Name.' },
        notEmpty: { msg: 'Building Name must not be empty.' },
      }
    },
    crater: {
      type: DataTypes.ENUM('Alpha','Downtown', 'Gamma', 'Haven', 'Highrise', 'Mines', 'Port', 'Reservoir', 'Riverside'),
      allowNull: false,
      defaultValue: 'Downtown'
    },
    faction: {
      type: DataTypes.ENUM('EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'),
      allowNull: false,
      defaultValue: 'EstateAgents',
      required: true
    },
    moths: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: []
      // references: {
      //   model: pgMoth,
      //   key: pgMoth.mothId,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // }
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    pilots: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: []
      // references: {
      //   model: pgPilot,
      //   key: pgPilot.pilotId,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // }
    },
    bays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 8
    },
    baysOccupied: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cash: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lightWell: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    monorailTerminal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    repairCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    repairDroids: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    salesSystem: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    stock: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: []
      // references: {
      //   model: pgPilot,
      //   key: pgPilot.pilotId,
      //   deferrable: Deferrable.INITIALLY_DEFERRED
      // }
    }
  },
  {
    sequelize, modelName: 'Building'
  });
  return pgBuilding;
};
