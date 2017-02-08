'use strict';
module.exports = ((sequelize, DataTypes) => {
  var Topic = sequelize.define('topic', {
    title: DataTypes.STRING,
    userID: DataTypes.VIRTUAL
  }, {
    timestamps: false,
    classMethods: {
      associate(models) {
        Topic.belongsToMany(models.user, { through: models.topicuser });
      }
    }
  });
  return Topic;
});
