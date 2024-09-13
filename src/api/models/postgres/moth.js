const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pgMoth extends Model {
    // helper methods here
    static associate(models) {
      // define association here
    }
  };
pgMoth.init(
// const pgMoth = sequelize.define('Moth', 
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('Silver-Y','Hawk', 'Neo Tiger', 'Deaths Head', 'Police', 'Moon', 'Swallow'),
      allowNull: false,
      defaultValue: 'Silver-Y'
    },
    cargoPod: {
      type: DataTypes.ENUM('Small', 'Medium', 'Large', 'X-Large'),
      allowNull: true
    },
    cell: {
      type: DataTypes.ENUM('Cell #1', 'Cell #2', 'Cell #3', 'Cell #4'),
      allowNull: false,
      defaultValue: 'Cell #1'
    },
    engine: {
      type: DataTypes.ENUM('Engine #1', 'Engine #2', 'Engine #3'),
      allowNull: false,
      defaultValue: 'Engine #1'
    },
    pilot: {
      type: DataTypes.UUID,
      allowNull: true
    },
    passenger: {
      type: DataTypes.UUID,
      allowNull: true
    },
    weapons: {
      type: DataTypes.ARRAY(DataTypes.UUID, DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    },
    statsShields: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    statsStructure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    statsCpu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    statsEngine: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    statsPower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    statsWeapons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    droneFitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    occupied: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    passengerSeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    numOfWeapons: {
      type: DataTypes.INTEGER, // weapons.length()
      allowNull: false,
      defaultValue: 5
    },
    softwareVersion : {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    sequelize, modelName: 'Moth'
  });
  return pgMoth;
}
