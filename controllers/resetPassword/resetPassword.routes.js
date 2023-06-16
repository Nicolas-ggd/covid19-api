const express = require('express');
const router = express.Router();
const resetPasswordController = require('./resetPassword.controller.js');

router.post("/", resetPasswordController.resetUserPassword);
router.post("/user-token", resetPasswordController.findUserWithToken);

module.exports = router;