const express = require("express");
const { UserModel } = require("../model/User.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", (req, res) => {
  res.send("All users");
});

userRouter.post("/signup", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await UserModel.find({ email });

    if (user.length > 0) {
      res.send({ mssg: "User already exists, login to continue", err: false });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ mssg: "Signup failed", err: err.message });
        } else {
          let newUser = new UserModel({ email, password: hash });
          await newUser.save();
          res.send({ mssg: "Signup successful", err: false });
        }
      });
    }
  } catch (err) {
    res.send({ mssg: "Signup failed", err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await UserModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ mssg: "Login successfull", token, err: false });
        } else {
          res.send({ mssg: "Wrong credentials" });
        }
      });
    } else {
      res.send({ mssg: "User not found, please singup first" });
    }
  } catch (err) {
    res.send({ mssg: "Signup failed", err: err.message });
  }
});

module.exports = {
  userRouter,
};
