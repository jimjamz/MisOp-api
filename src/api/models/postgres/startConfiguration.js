const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pgStartConfig extends Model {
    // helper methods here

  };
pgStartConfig.init( 
  {
    role: {
      type: DataTypes.ENUM('Trader', 'Scavenger', 'Aggressor'),
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        notNull: { msg: 'Start Configuration cannot be null.' },
        notEmpty: { msg: 'Start Configuration must not be empty.' },
      }
    },
    description: {
      type: DataTypes.STRING
    },
    cash: {
      type: DataTypes.INTEGER,
      defaultValue: 10000,
      allowNull: false
    },
    location: {
      type: DataTypes.ARRAY(DataTypes.STRING, DataTypes.STRING),
      allowNull: false,
      defaultValue: ["Downtown", "God Hangar"]
    },
    moth: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    cargoPod: {
      type: DataTypes.UUID,
      allowNull: true,
    }
  },
  {
    sequelize, modelName: 'StartConfiguration'
  });
  return pgStartConfig;
};
