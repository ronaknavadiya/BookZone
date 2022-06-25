const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ sucess: false, message: "Please provide all values.." });
    }
    const candidateUser = await Users.findOne({ email }).select("+password");
    if (!candidateUser) {
      res.status(400).json({
        sucess: "false",
        message: "Invalid Credentials",
      });
    }
    console.log(password, candidateUser.password);
    const isPassCorrect = await bcrypt.compare(
      password,
      candidateUser.password
    );
    if (!isPassCorrect) {
      res.status(400).json({
        sucess: "false",
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: candidateUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    candidateUser.password = undefined;

    res.status(200).json({ user: candidateUser, token });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error.message);
  }
};

const createtUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    //   throw new BadRequestError("please provide all values");
    return res
      .status(400)
      .json({ sucess: "false", message: "please provide all values" });
  }

  const isUserAlreadyExists = await Users.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      sucess: "false",
      message: "User already exists please log in..",
    });
  }

  try {
    const newUser = await Users.create({ userName, password, email });
    const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    // const token = Users.createJWT();
    res.status(200).json({ user: newUser, token });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error.message);
  }
};

module.exports = { getUser, createtUser };
