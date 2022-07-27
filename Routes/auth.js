const  express = require("express")
const router = express.Router()
const {getUser,createtUser} = require("../controller/authenticateController")

router.route("/").get(getUser).post(createtUser);

module.exports = router;