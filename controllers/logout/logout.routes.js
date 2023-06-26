const express = require('express');
const router = express.Router();
const logoutController = require('./logout.controller.js');

router.post('/', logoutController.userLogout);

module.exports = router;