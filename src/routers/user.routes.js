const express = require("express");
const {
  signUp,
  signIn,
  getUsers,
  getUserByID,
  deleteUser,
} = require("../controllers/user.controllers");
const { validateSignUp, validateSignIn } = require("../helpers/validate");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/users", [validateSignUp], signUp);
router.post("/login", [validateSignIn], signIn);
router.get("/users", [verifyToken], getUsers);
router.get("/users/:id", [verifyToken], getUserByID);
router.delete("/users/:id", [verifyToken], deleteUser);

module.exports = router;
