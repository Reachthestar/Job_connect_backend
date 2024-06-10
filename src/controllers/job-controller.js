const jobService = require('../services/job-service');
const createError = require('../utils/create-error');

const jobController = {};

jobController.createJob = async (req, res, next) => {
  try {
    const { role, id } = req.user;

    if (!role || !(role === 'COMPANY')) {
      createError({
        message: 'only COMPANY can create post.',
        statusCode: 400,
      });
    }

    const jobDetails = req.body;

    const data = { ...jobDetails, userId: id };

    await jobService.createJob(data);

    res.status(200).json({ message: 'job created' });
  } catch (err) {
    next(err);
  }
};

jobController.getAllJobs = async (req, res, next) => {
  try {
    const { role, id } = req.user;

    if (!role || !(role === 'COMPANY')) {
      createError({
        message: 'only COMPANY can see posts.',
        statusCode: 400,
      });
    }

    const jobs = await jobService.findAllJobsByUserId(id);

    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

module.exports = jobController;
