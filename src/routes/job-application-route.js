const express = require('express');
const jobApplicationController = require('../controllers/job-application-controller');
const jobApplicationRouter = express.Router();

jobApplicationRouter.post(
  '/create',
  jobApplicationController.createJobApplication
);
jobApplicationRouter.get(
  '/',
  jobApplicationController.getAllJobsApplicationByUserId
);
jobApplicationRouter.get(
  '/:jobId',
  jobApplicationController.getJobAndApplicantByJobId
);
jobApplicationRouter.delete(
  '/:applicationId',
  jobApplicationController.deleteApplicationByApplicationId
);

module.exports = jobApplicationRouter;
