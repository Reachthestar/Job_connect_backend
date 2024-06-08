const prisma = require('../models/prisma');

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserByEmail = (email) =>
  prisma.user.findFirst({ where: { email } });

module.exports = userService;
