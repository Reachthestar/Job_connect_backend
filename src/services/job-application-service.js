const prisma = require('../models/prisma');

const jobApplicationService = {};

jobApplicationService.createJobApplication = (data) =>
  prisma.application.create({ data });

jobApplicationService.findJobApplicationByUserId = (userId) =>
  prisma.application.findMany({
    where: { userId },
    include: { job: true },
  });

jobApplicationService.findJobApplicationByApplicationId = (applicationId) =>
  prisma.application.findFirst({ where: { id: applicationId } });

jobApplicationService.deleteApplicationById = (applicationId) =>
  prisma.application.delete({ where: { id: applicationId } });

module.exports = jobApplicationService;
