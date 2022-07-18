const Joi = require("joi");
const mongoose = require("mongoose");

const userJoi = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(1),
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: String,
}, {
  timestamps: true
});

userSchema.statics.validate = function (obj) {
  const { error, value } = userJoi.validate(obj, {
    allowUnknown: true,
    stripUnknown: true,
  });
  return { error, value };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
