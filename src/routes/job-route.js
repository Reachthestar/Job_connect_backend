const express = require('express');
const jobController = require('../controllers/job-controller');
const authenticate = require('../middlewares/authenticate');

const jobRouter = express.Router();

jobRouter.get('/', jobController.getAllJobs);
jobRouter.post('/create', authenticate, jobController.createJob);
jobRouter.get('/myJobs', authenticate, jobController.getAllJobsByUserId);
jobRouter.delete('/:jobId', authenticate, jobController.deleteJobByJobId);

module.exports = jobRouter;
