const hashService = require('../services/hash-service');
const jwtService = require('../services/jwt-service');
const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.body;

    const existUser = await userService.findUserByEmail(data.email);

    if (existUser) {
      createError({
        message: 'email already in used',
        field: 'email',
        statusCode: '400',
      });
    }

    data.password = await hashService.hash(data.password);
    await userService.createUser(data);

    res.status(200).json({ message: 'register successfully' });
  } catch (err) {
    next(err);
  }
};

authController.login = async (req, res, next) => {
  try {
    const existUser = await userService.findUserByEmail(req.body.email);

    if (!existUser) {
      createError({
        message: 'invalid credential',
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.body.password,
      existUser.password
    );

    if (!isMatch) {
      createError({
        message: 'invalid credential',
        statusCode: 400,
      });
    }

    const accessToken = jwtService.sign({ id: existUser.id });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;
