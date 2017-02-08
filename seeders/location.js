'use strict';
const cs = require('casual');
module.exports = {
  up: function (queryInterface, Sequelize) {
     let content = [];
  for (let i=0; i<10; i++){
      content.push({
      city: cs.city,
      country: cs.country,
       });
    };
      return queryInterface.bulkInsert('locations', content, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
