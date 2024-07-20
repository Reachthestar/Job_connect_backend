const jobService = require('../services/job-service');
const createError = require('../utils/create-error');
const userService = require('../services/user-service');

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

    res.status(201).json({ message: 'job created' });
  } catch (err) {
    next(err);
  }
};

jobController.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

jobController.getAllJobsByUserId = async (req, res, next) => {
  try {
    const { role, id } = req.user;

    if (!role || !(role === 'COMPANY')) {
      createError({
        message: 'only COMPANY can see posts.',
        statusCode: 400,
      });
    }

    const myJobs = await jobService.findAllJobsByUserId(id);

    res.status(200).json(myJobs);
  } catch (err) {
    next(err);
  }
};

jobController.deleteJobByJobId = async (req, res, next) => {
  try {
    console.log(req.params.jobId);
    const existUser = await userService.findUserById(req.user.id);
    console.log(existUser);

    if (!existUser) {
      createError({
        message: 'user invalid',
        statusCode: 400,
      });
    }

    const existJob = await jobService.getJobAndApplicantByJobId(
      +req.params.jobId
    );
    console.log(existJob);

    if (!existJob) {
      createError({
        message: 'Job invalid',
        statusCode: 400,
      });
    }

    if (existJob.userId !== req.user.id) {
      createError({
        message: 'No permission',
        statusCode: 403,
      });
    }

    await jobService.deleteJobByJobId(existJob.id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = jobController;
