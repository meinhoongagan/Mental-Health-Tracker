const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profilePicture: Joi.string().pattern(/^data:image\/[a-zA-Z]+;base64,[^\s]+$/).optional(),  // Optional base64-encoded image
});

module.exports = userSchema;
