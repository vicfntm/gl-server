'use strict';
const models = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const customConfig = JSON.parse(fs.readFileSync('./config/secret.json'));


module.exports = {
  verify(request, response) {
    models.user.findOne({
        where: { email: request.body.email },
        attributes: ['code', 'id']
      })
      .then(((userFound) => {
        if (!userFound) {
          response.status(404).json({ 'status': 'user not found' });
        } else if (request.body.code != userFound.code) {
          response.status(403).json({ 'status': 'code does not valid' })
        } else {
          let userToken = jwt.sign({ id: userFound.id }, customConfig.jwtSecret);
          response.json({ 'token': userToken, 'status': 'You have successfully logged' });
        }
      }))
  }
};
