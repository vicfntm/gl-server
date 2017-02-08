'use strict';
module.exports = ((sequelize, DataTypes) => {
  var Industry = sequelize.define('industry', {
    title: {
      type: DataTypes.STRING,
      validate: { notEmpty: true }
    }
  }, {
    timestamps: false
  }, {
    classMethods: {
      associate(models) {
        industry.hasMany(models.experience);
      }
    }
  });
  return Industry;
});
