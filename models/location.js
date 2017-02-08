'use strict';
module.exports = ((sequelize, DataTypes) => {
  var Location = sequelize.define('location', {
    city: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    timestamps: false
  }, {
    classMethods: {
      associate(models) {
        location.hasMany(models.experience);
      }
    }
  });
  return Location;
});
