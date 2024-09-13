const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pgFaction extends Model {
    // helper methods here
    static associate(models ) {
      // define association here
      // this.hasMany(models.Crater, { 
      //   foreignKey: 'faction',
      //   sourceKey: 'name'
      // });
    }
  };
  pgFaction.init( 
  {
    name: {
      type: DataTypes.ENUM('EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'),
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        notNull: { msg: 'Faction must have a Name.' },
        notEmpty: { msg: 'Faction Name must not be empty.' },
      },
    },
    enemy: {
      type: DataTypes.ENUM('EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'),
      allowNull: true
    },
    friend: {
      type: DataTypes.ENUM('EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'),
      allowNull: true
    }
  },
  {
    sequelize, modelName: 'Faction'
  });
  return pgFaction;
};
