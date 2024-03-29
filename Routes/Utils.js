const express = require("express");
const router = express.Router();
const { followUnfollowUser } = require("../controller/authenticateController");
const {
  AddFavGenre,
  LikeBooks,
  getSpecificUser,
  postFeedback,
} = require("../controller/UtillsConroller");

const {UserController}=require("../controller/UserProfileController");;




router.route("/usersearch").post(UserController);
router.route("/followUnfollow").put(followUnfollowUser);
router.route("/favGenre").post(AddFavGenre);
router.route("/likeBook").put(LikeBooks);
router.route("/friendUser").post(getSpecificUser);
router.route("/feedback").post(postFeedback)

module.exports = router;
