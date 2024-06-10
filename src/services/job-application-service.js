const prisma = require('../models/prisma');

const jobApplicationService = {};

jobApplicationService.createJobApplication = (userId, jobId, status) =>
  prisma.application.create({ data: { id: userId, jobId, status } });

// jobApplicationService.findJobApplicationByUserId = (userId) =>
//   prisma.application.findFirst({ where: { id: userId } });

module.exports = jobApplicationService;
