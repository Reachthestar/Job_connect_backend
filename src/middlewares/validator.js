const { loginSchema, registerSchema } = require('../validator/auth-validator');

exports.registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); //if abortearly : true throw details at 0
  }

  //   req.body = value;
  req.input = value; //can put input for dont modify req.body

  next();
};
exports.loginValidator = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.input = value;

  next();
};
