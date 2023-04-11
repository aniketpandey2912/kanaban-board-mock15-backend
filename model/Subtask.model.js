const mongoose = require("mongoose");

const SubtaskSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    status: { type: String, enum: ["Todo", "Doing", "Done"], default: "Todo" },
    subtask: [{ title: String, isCompleted: Boolean }],
  },
  {
    versionKey: false,
  }
);

const SubtaskModel = mongoose.model("subtask", SubtaskSchema);

module.exports = {
  SubtaskSchema,
  SubtaskModel,
};
