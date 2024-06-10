const jobApplicationService = require('../services/job-application-service');
const createError = require('../utils/create-error');

const jobApplicationController = {};

jobApplicationController.createJobApplication = async (req, res, next) => {
  // console.log(req.user);
  try {
    const { role } = req.user;

    if (!role || !(role === 'SEEKER')) {
      createError({
        message: 'the company does not allowes to create job application',
        statusCode: 400,
      });
    }

    await jobApplicationService.createJobApplication(
      req.user.id,
      req.body.status
    );

    res.status(200).json({ message: 'create application successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = jobApplicationController;
