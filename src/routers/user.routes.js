const express = require("express");
const { signUp, signIn } = require("../controllers/user.controllers");
const { validateSignUp, validateSignIn } = require("../helpers/validate");
const router = express.Router();

router.post("/users", validateSignUp, signUp);
router.post("/login", validateSignIn, signIn);

module.exports = router;
