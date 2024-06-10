const createError = require('../utils/create-error');

const userController = {};

userController.updateProfile = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log('file', req.file.profileImage);
    console.log('body', req.body.message);

    // if (!req.file) {
    //   createError({
    //     message: 'No file upload',
    //     statusCode: 400,
    //   });
    // }

    res.status(200).json({ message: 'profile updated' });
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
