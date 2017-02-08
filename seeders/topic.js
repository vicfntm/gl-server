'use strict';
const cs = require('casual');
module.exports = {
  up: function (queryInterface, Sequelize) {
      let content = [];
  for (let i=0; i<20; i++){
      content.push({
      title: cs.short_description
       });
    };
      return queryInterface.bulkInsert('topics', content, {});
// 


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
