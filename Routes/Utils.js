const express = require("express");
const router = express.Router();
const { followUnfollowUser } = require("../controller/authenticateController");
const { AddFavGenre } = require("../controller/UtillsConroller");

router.route("/followUnfollow").put(followUnfollowUser);
router.route("/favGenre").post(AddFavGenre);

module.exports = router;
