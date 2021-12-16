const express = require("express");
const Auth = require("../controllers/auth-controller");
const router = express.Router();

router.route("/signup").post(Auth.register);

module.exports = router;
