const mongoose = require("mongoose");
const { SubtaskSchema } = require("./Subtask.model");

const TaskSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    status: { type: String, enum: ["Todo", "Doing", "Done"], default: "Todo" },
    subtask: [{ type: SubtaskSchema }],
  },
  {
    versionKey: false,
  }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = {
  TaskSchema,
  TaskModel,
};
