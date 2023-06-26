const router = require("express").Router();
const { createUser } = require("../controller/user");

router.route("/register").post(createUser);

module.exports = router;
