const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userSignValidator } = require("../validator");
const { userById } = require("../controllers/user");

const router = express.Router();

router.post("/signup", userSignValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

// any route containing :userId, our app will first execure userById()
router.param("userId", userById);

module.exports = router;
