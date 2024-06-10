const express = require('express');
const jobApplicationController = require('../controllers/job-application-controller');
const jobApplicationRouter = express.Router();

jobApplicationRouter.post(
  '/create',
  jobApplicationController.createJobApplication
);

module.exports = jobApplicationRouter;
