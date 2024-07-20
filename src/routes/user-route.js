const express = require('express');
const userController = require('../controllers/user-controller');
const uploadImage = require('../middlewares/upload-image');
const userRouter = express.Router();

userRouter.get('/', userController.getUserProfile);
userRouter.patch('/updateProfile', userController.updateUserProfile);
userRouter.get('/:userId', userController.getProfileUserById);
// userRouter.patch(
//   '/',
//   uploadImage.single('profileImage'),
//   userController.updateProfile
// );

module.exports = userRouter;
