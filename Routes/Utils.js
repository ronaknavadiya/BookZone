const express = require("express");
const router = express.Router();
const { followUnfollowUser } = require("../controller/authenticateController");
const { AddFavGenre, LikeBooks } = require("../controller/UtillsConroller");

router.route("/followUnfollow").put(followUnfollowUser);
router.route("/favGenre").post(AddFavGenre);
router.route("/likeBook").put(LikeBooks);

module.exports = router;
