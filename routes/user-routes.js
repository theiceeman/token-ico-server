const express = require("express");
const Auth = require("../controllers/auth-controller");
const router = express.Router();

router.route("/signup").post(Auth.register);
router.route("/verify/referrer/:id").get(Auth.validate_referrer);

module.exports = router;
