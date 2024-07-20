const jobApplicationService = require('../services/job-application-service');
const jobService = require('../services/job-service');
const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const jobApplicationController = {};

jobApplicationController.createJobApplication = async (req, res, next) => {
  // console.log(req.user);
  try {
    const { role } = req.user;

    if (!role || !(role === 'SEEKER')) {
      createError({
        message: 'the company does not allow to create job application',
        statusCode: 400,
      });
    }
    const data = {
      userId: req.user.id,
      jobId: req.body.jobId,
      status: 'PENDING',
    };

    await jobApplicationService.createJobApplication(data);

    res.status(201).json({ message: 'create job application successfully' });
  } catch (err) {
    next(err);
  }
};

jobApplicationController.getAllJobsApplicationByUserId = async (
  req,
  res,
  next
) => {
  try {
    const jobsApplication =
      await jobApplicationService.findJobApplicationByUserId(req.user.id);

    console.log(jobsApplication);
    res.status(200).json(jobsApplication);
  } catch (err) {
    next(err);
  }
};

jobApplicationController.getJobAndApplicantByJobId = async (req, res, next) => {
  try {
    const applicants = await jobService.getJobAndApplicantByJobId(
      +req.params.jobId
    );

    console.log(applicants);
    res.status(200).json(applicants);
  } catch (err) {
    next(err);
  }
};

jobApplicationController.deleteApplicationByApplicationId = async (
  req,
  res,
  next
) => {
  try {
    const existUser = await userService.findUserById(req.user.id);

    if (!existUser) {
      createError({
        message: 'user invalid',
        statusCode: 400,
      });
    }

    const existApplication =
      await jobApplicationService.findJobApplicationByApplicationId(
        +req.params.applicationId
      );

    if (!existApplication) {
      createError({
        message: 'application invalid',
        statusCode: 400,
      });
    }

    if (existApplication.userId !== req.user.id) {
      createError({
        message: 'No permission',
        statusCode: 403,
      });
    }

    await jobApplicationService.deleteApplicationById(existApplication.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = jobApplicationController;
