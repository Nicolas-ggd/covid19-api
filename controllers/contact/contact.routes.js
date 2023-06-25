const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller.js');

router.post('/create-contact', contactController.createContact);

module.exports = router;