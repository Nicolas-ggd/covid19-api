const express = require('express');
const router = express.Router();
const authController = require('./auth.controller.js');

router.post("/", authController.userAuth);

module.exports = router;