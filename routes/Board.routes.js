const express = require("express");
const { BoardModel } = require("../model/Board.model");
const { TaskModel, TaskSchema } = require("../model/Task.model");
const { SubtaskModel } = require("../model/Subtask.model");
const boardRouter = express.Router();

boardRouter.get("/", async (req, res) => {
  let payload = req.body;
  let boards = await BoardModel.find({ user: payload.user });
  res.send({ mssg: "All your boards", boards });
});

boardRouter.post("/addboard", async (req, res) => {
  let payload = req.body;
  //   console.log(payload);
  try {
    let newBoard = new BoardModel(payload);
    await newBoard.save();
    res.send({ mssg: "Board added successfully" });
  } catch (err) {
    res.send({ mssg: "Can't add board", err: err.message });
  }
});

boardRouter.post("/addtask", async (req, res) => {
  let payload = req.body;
  console.log(payload);
  try {
    let newTask = await TaskModel(payload);
    await BoardModel.findOneAndUpdate(
      {
        user: payload.user,
        name: payload.status,
      },
      { tasks: { $push: newTask } }
    );
    res.send({ mssg: "Task added" });
  } catch (err) {
    res.send({ mssg: "Task addition failed", err: err.message });
  }
});

boardRouter.post("/addsubtask", async (req, res) => {
  let payload = req.body;
  //   console.log(payload);
  try {
    let newSubTask = await SubtaskModel(payload);
    await BoardModel.findOneAndUpdate(
      {
        user: payload.user,
        name: payload.status,
      },
      { tasks: { subtask: { $push: newSubTask } } }
    );

    res.send({ mssg: "Sub-Task added" });
  } catch (err) {
    res.send({ mssg: "Sub-Task addition failed", err: err.message });
  }
});

module.exports = {
  boardRouter,
};
