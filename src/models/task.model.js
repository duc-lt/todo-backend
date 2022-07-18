const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema, model } = mongoose;

const taskJoi = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().trim().min(1).required(),
});

const taskSchema = new Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true
});

taskSchema.statics.validate = function (obj) {
  const { error, value } = taskJoi.validate(obj, {
    allowUnknown: true,
    stripUnknown: true,
  });
  return { error, value };
};

const Task = model("Task", taskSchema);
module.exports = Task;
