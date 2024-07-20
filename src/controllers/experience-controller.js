const experienceService = require('../services/experience-service');
const createError = require('../utils/create-error');

const experienceController = {};

experienceController.createExperience = async (req, res, next) => {
  try {
    // console.log(req.user);
    // console.log(req.body);
    const { role } = req.user;
    console.log(role);

    if (!role || !(role === 'SEEKER')) {
      createError({
        message: ' Do not allow to create an experience',
        statusCode: 400,
      });
    }

    const data = {
      ...req.body,
      userId: req.user.id,
      startYear: +req.body.startYear,
      endYear: +req.body.endYear,
    };

    await experienceService.createExperience(data);
    res.status(201).json({ message: 'create exp' });
  } catch (err) {
    next(err);
  }
};

module.exports = experienceController;
