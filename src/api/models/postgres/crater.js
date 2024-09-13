const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pgCrater extends Model {
    // helper methods here
    static associate(models ) {
      // define association here
      // this.belongsTo(models.Faction, {
        // foreignKey: 'faction',
        // targetKey: 'name'
        // type: DataTypes.STRING
        // because the responsibility of the ENUM validation is left to the primary key in Faction, 
        // can the datatype of the foreign key (this) simply be a STRING? No. Invalid constraint on fkey.
        // });
    }
  };
pgCrater.init(
  {
    name: {
      type: DataTypes.ENUM('Alpha','Downtown', 'Gamma', 'Haven', 'Highrise', 'Mines', 'Port', 'Reservoir', 'Riverside'),
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        notNull: { msg: 'Crater must have a Name.' },
        notEmpty: { msg: 'Crater Name must not be empty.' },
      },
    },
    // does the foreign key 'faction' need to be defined or can it be referenced from the parent table via the association?
    faction: {
      type: DataTypes.ENUM('EstateAgents', 'Flyers', 'Klamp-G', 'Lazarus', 'Pirates', 'Police', 'Scrubbers', 'Skinners'),
    },
    connectingCraters: {
      // would be a many-to-many relationship of the models own instances 
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    hasMonorail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: { msg: 'hasMonorail must be either true or false.' },
        notEmpty: { msg: 'hasMonorail must not be empty.' },
      },
    },
  },
  {
    sequelize, modelName: 'Crater'
  });
  return pgCrater;
};

