const express = require('express');
const router = express.Router();
const userController = require('./user.controller.js');

router.get('/user-list', userController.getUserList);

module.exports = router;