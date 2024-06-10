const cloudinary = require('../config/cloudinary');

const uploadImageService = {};
uploadImageService.upload = async (path) => {
  const { secure_url } = await cloudinary.uploader.upload(path);

  return secure_url;
};

module.exports = uploadImageService;
