const express = require('express');
const experienceController = require('../controllers/experience-controller');

const experienceRouter = express.Router();

experienceRouter.post('/create', experienceController.createExperience);

module.exports = experienceRouter;
