const prisma = require('../models/prisma');

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserByEmail = (email) =>
  prisma.user.findFirst({ where: { email } });

userService.findUserById = (userId) =>
  prisma.user.findFirst({
    where: { id: userId },
    include: { Experience: true },
  });

userService.updateUserProfile = (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

module.exports = userService;
