const prisma = require('../models/prisma');

const jobService = {};

const userFilter = {
  role: true,
  companyName: true,
  companyDescription: true,
  profileImage: true,
  isActive: true,
};

const userApplicantFilter = {
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  province: true,
  city: true,
  jobTitle: true,
  profileImage: true,
  isActive: true,
  role: true,
};

jobService.createJob = (data) => prisma.job.create({ data });

jobService.getAllJobs = () =>
  prisma.job.findMany({
    include: {
      user: {
        select: userFilter,
      },
    },
  });

jobService.findAllJobsByUserId = (userId) =>
  prisma.job.findMany({ where: { userId } });

jobService.getJobAndApplicantByJobId = (jobId) =>
  prisma.job.findFirst({
    where: { id: jobId },
    include: {
      Application: {
        include: { user: { select: userApplicantFilter } },
      },
    },
  });

jobService.deleteJobByJobId = (jobId) =>
  prisma.job.delete({ where: { id: jobId } });

module.exports = jobService;
