const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Task = model("Task", taskSchema);

module.exports = { Task, taskSchema };
