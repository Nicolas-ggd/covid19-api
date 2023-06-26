const express = require('express');
const router = express.Router();
const userController = require('./user.controller.js');

router.get('/user-list', userController.getUserList);
router.get('/online-user-list', userController.getOnlineUserList);

module.exports = router;