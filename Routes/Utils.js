const express = require("express");
const router = express.Router();
const { followUnfollowUser } = require("../controller/authenticateController");
const { AddFavGenre } = require("../controller/UtillsConroller");
const {UserController}=require("../controller/UserProfileController");;
router.route("/followUnfollow").put(followUnfollowUser);
router.route("/favGenre").post(AddFavGenre);
router.route("/usersearch").post(UserController);
module.exports = router;
