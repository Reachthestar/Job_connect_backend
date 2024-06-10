const prisma = require('../models/prisma');

const jobService = {};

jobService.createJob = (data) => prisma.job.create({ data });

jobService.findAllJobsByUserId = (userId) =>
  prisma.job.findMany({ where: { userId } });

module.exports = jobService;
