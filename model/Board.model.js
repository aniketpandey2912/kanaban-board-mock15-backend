const mongoose = require("mongoose");
const { TaskModel, TaskSchema } = require("./Task.model");

const BoardSchema = mongoose.Schema(
  {
    user: String,
    name: String,
    tasks: [{ type: TaskSchema }],
  },
  {
    versionKey: false,
  }
);

const BoardModel = mongoose.model("board", BoardSchema);

module.exports = {
  BoardModel,
};
