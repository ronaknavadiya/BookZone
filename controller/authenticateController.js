const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    // console.log(req.query.email);
    const { email, password } = req.query;
    if (!email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "Please provide all values.." });
    }
    const candidateUser = await Users.findOne({ email }).select("+password");
    if (!candidateUser) {
      return res.status(400).json({
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

    return res.status(200).json({ user: candidateUser, token });
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

const followUnfollowUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const { friendUserId } = req.query;

    const user = await Users.findById(userId);
    const friendUser = await Users.findById(friendUserId);
    if (!user || !friendUser) {
      return res
        .status(500)
        .json({ sucess: false, message: "Not able to find user ID" });
    }

    const isAlreadyFollowed = user.following.includes(friendUserId);

    let msg = "";
    if (isAlreadyFollowed) {
      newFollowing = user.following.filter((uid) => uid !== friendUserId); // for current user
      user.following = newFollowing;
      msg = "User Unfollowed sucessfully !!";
      newFollowers = friendUser.followers.filter((uid) => uid !== userId); // for friend
      friendUser.followers = newFollowers;
    } else {
      user.following.push(friendUserId);
      friendUser.followers.push(userId);
      msg = "User Followed sucessfully !!";
    }
    await Users.findByIdAndUpdate(
      userId,
      { following: user.following },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err.message);
        }
      }
    );

    await Users.findByIdAndUpdate(
      friendUserId,
      { followers: friendUser.followers },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err.message);
        }
      }
    );

    return res.status(200).send(msg);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error.message);
  }
};

module.exports = { getUser, createtUser, followUnfollowUser };
