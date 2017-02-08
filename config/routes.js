const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');
const verification = require('../controllers/user-verify');

router
  .route('/user-sign-in')
  .post(usersController.signIn);

router
  .route('/user-update')
  .post(usersController.update);

router
  .route('/user-show')
  .post(usersController.show);

router
  .route('/user-sign-up')
  .post(usersController.signUp);

router
  .route('/user-verify')
  .post(verification.verify);


module.exports = router;
