'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      callPrice: {
        type: Sequelize.FLOAT
      },
      messagePrice: {
        type: Sequelize.FLOAT
      },
      about: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
