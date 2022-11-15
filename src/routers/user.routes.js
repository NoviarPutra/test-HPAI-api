const express = require("express");
const { signUp } = require("../controllers/user.controllers");
const { validateSignUp } = require("../helpers/validate");
const router = express.Router();

router.post("/users", validateSignUp, signUp);

module.exports = router;
