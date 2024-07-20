const prisma = require('../models/prisma');

const experienceService = {};

experienceService.createExperience = (data) =>
  prisma.experience.create({ data });

module.exports = experienceService;
