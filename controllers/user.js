'use strict';
const models = require('../models');
const sendMail = require('../services/send-mail');
const fs = require('fs');
const customConfig = JSON.parse(fs.readFileSync('./config/secret.json'));

module.exports = {
  signIn(request, response) {
    let userInfo = request.body;
    models.user.findOne({
        where: { email: userInfo.email },
        attributes: ['firstName', 'email', 'code']
      })
      .then((userFound) => {
        if (!userFound) {
          response.status(404).json({ 'status': 'user not found' });
        } else {
          userFound.code = models.user.Instance.prototype.createCode();
          models.user.update({ code: userFound.code }, {
            where: { email: userFound.email },
            returning: true
          });
          sendMail.send(customConfig.userPass, userFound.code);
          response.json({ 'data': { 'status': 'code verification sent to your email' } });
        }
      });
  },
  signUp(request, response) {
    let userInfo = request.body;
    models.user.findOne({
        where: { email: userInfo.email },
        attributes: ['firstName', 'email', 'code']
      })
      .then(((userFound) => {
        if (userFound) {
          response.status(400).json({ 'status': 'user has already exist' });
        } else {
          userInfo.code = models.user.Instance.prototype.createCode();
          models.user.create(
            userInfo
          );
          sendMail.send(customConfig.userPass, userInfo.code);
          response.json({ 'data': { 'status': 'code verification sent to your email' } });
        }
      }));
  },
  update(request, response) {
    const userInfo = request.body.user;
    const idFromRequest = request.user.id;
    const userExpsToCreate = request.body.experiencesToCreate;
    const topicsToCreate = request.body.topicsToCreate;
    const topicsToDelete = request.body.topicsToDelete;
    if (userExpsToCreate.length != 0) {
      for (let i = 0; i < userExpsToCreate.length; i++) { userExpsToCreate[i].userId = idFromRequest };
      models.experience.bulkCreate(
        userExpsToCreate
      );
    };
    let userExpsToDelete = request.body.experiencesToDelete;
    if (userExpsToDelete.length != 0) {
      models.experience.destroy({
        where: { id: userExpsToDelete }
      })
    };
    let objArr = [];
    let idArr = [];
    for (let i = 0; i < topicsToCreate.length; i++) {
      if (isNaN(topicsToCreate[i])) {
        objArr.push(topicsToCreate[i]);
      } else {
        idArr.push(topicsToCreate[i]);
      }
    };
    if (objArr.length != 0) {
      objArr.forEach((topicElement) => {
        return models.topic.create({ title: topicElement.title })
          .then((createdTopic) => {
            models.topicuser.create({ userId: idFromRequest, topicId: createdTopic.id });
          });
      })
    };
    if (idArr.length != 0) {
      idArr.forEach((oldTopicElement) => {
        return models.topicuser.create({ userId: idFromRequest, topicId: oldTopicElement })
      })
    };
    if (topicsToDelete != 0) {
      models.topicuser.destroy({
        where: { id: topicsToDelete }
      })
    };
    response.json({ 'data': { 'status': 'updated' } });
  },
  show(request, response) {
    models.user.findAll({
        where: {
          slug: request.body.userSlug
        },
        attributes: ['firstName', 'lastName', 'callPrice', 'messagePrice', 'about', 'avatar', 'email', 'slug'],
        include: [{
          model: models.experience,
          attributes: ['company', 'title', 'industryId', 'locationId', 'yearFrom', 'yearTo'],
          include: [{
            model: models.location
          }],
          include: [{
            model: models.industry
          }]
        }],
        order: [
          [models.experience, 'yearTo', 'DESC']
        ]
      })
      .then((usr) => {
        if (!usr) {
          return response.status(404).send({ 'status': 'User Not Found' });
        } else {
          response.json(usr);
        }
      })
      .catch((error) => {
        return response.status(500).send({ 'status': 'Server error internal' });
      })
  }

};
