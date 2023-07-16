const express = require('express');
const router = express.Router();
const covidApiController = require('./covidapi.controller.js');

router.get("/covid-api", covidApiController.getCovidData);

module.exports = router;