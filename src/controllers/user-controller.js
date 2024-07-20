const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const userController = {};

userController.getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.id);

    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

userController.updateUserProfile = async (req, res, next) => {
  try {
    const existUser = await userService.findUserByEmail(req.user.email);
    console.log(existUser.companyName);

    if (
      existUser.companyName !== null &&
      existUser.companyName == req.body.companyName
    ) {
      createError({
        message: 'company name already in used',
        field: 'companyName',
        statusCode: '400',
      });
    }

    const data = req.body;
    console.log(data);

    const result = await userService.updateUserProfile(req.user.id, data);
    console.log(result);
    res.status(200).json({ message: 'profile updated' });
  } catch (err) {
    next(err);
  }
};

userController.getProfileUserById = async (req, res, next) => {
  try {
    const data = await userService.findUserById(+req.params.userId);
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// userController.userController.updateProfile = async (req, res, next) => {
//   try {
//     console.log(req.user);
//     console.log('file', req.file.profileImage);
//     console.log('body', req.body.message);

//     if (!req.file) {
//       createError({
//         message: 'No file upload',
//         statusCode: 400,
//       });
//     }

//     res.status(200).json({ message: 'profile updated' });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = userController;
