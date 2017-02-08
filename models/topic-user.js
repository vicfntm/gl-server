'use strict';
module.exports = ((sequelize, DataTypes) => {
  var TopicUser = sequelize.define('topicuser', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return TopicUser;
});
