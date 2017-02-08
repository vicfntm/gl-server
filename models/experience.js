'use strict';

module.exports = ((sequelize, DataTypes) => {
  var Experience = sequelize.define('experience', {

    company: {
      type: DataTypes.STRING,
      validate: { notEmpty: true }
    },
    title: DataTypes.STRING,
    yearFrom: {
      type: DataTypes.INTEGER,
      validate: { notEmpty: true }
    },
    yearTo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    industryId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    classMethods: {
      associate(models) {
        Experience.belongsTo(models.user);
        Experience.belongsTo(models.industry);
        Experience.belongsTo(models.location);
      }
    }
  });

  return Experience;
});
