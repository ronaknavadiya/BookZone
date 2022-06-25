const express = require("express");
const router = express.Router();
const { followUnfollowUser } = require("../controller/authenticateController");

router.route("/followUnfollow").put(followUnfollowUser);

module.exports = router;
