const express = require('express');
const userController = require('../controllers/user-controller');
const uploadImage = require('../middlewares/upload-image');
const userRouter = express.Router();

userRouter.patch(
  '/',
  uploadImage.single('profileImage'),
  userController.updateProfile
);

module.exports = userRouter;
