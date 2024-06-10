const express = require('express');
const jobController = require('../controllers/job-controller');

const jobRouter = express.Router();

jobRouter.post('/create', jobController.createJob);
jobRouter.get('/', jobController.getAllJobs);

module.exports = jobRouter;
