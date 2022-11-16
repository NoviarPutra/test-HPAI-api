const { hashSync, compare } = require("bcrypt");
const { config } = require("dotenv");
const { sign } = require("jsonwebtoken");
const User = require("../models/user.models");
config();

module.exports = {
  signUp: async (req, res) => {
    const { email } = req.body;
    try {
      req.body.password = hashSync(req.body.password, 10);

      //   CHECK EMAIL
      const checkEmail = await User.findOne({ where: { email: email } });
      if (checkEmail)
        return res.status(400).json({ message: "EMAIL ALREADY REGISTERED !" });

      // INSERT DATA
      const response = await User.create(req.body);
      if (!response)
        return res.status(400).json({ message: "Something went wrong!" });

      //   DESTRUCT RESPONSE
      const { id, password, ...otherValues } = response.dataValues;

      //   RESPONSE TO CLIENT
      return res.status(201).json({ message: "Created", data: otherValues });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      //   CHECK EMAIL
      const checkEmail = await User.findOne({ where: { email: email } });
      if (!checkEmail)
        return res.status(400).json({ message: "EMAIL NOT REGISTERED !" });

      // CHECK PASSWORD
      const match = await compare(password, checkEmail.dataValues.password);
      if (!match) return res.status(400).json({ message: "WRONG PASSWORD !" });

      //   SIGN TOKEN
      const payload = {
        name: checkEmail.dataValues.name,
        email: checkEmail.dataValues.email,
        role: checkEmail.dataValues.role,
      };
      const options = {
        expiresIn: "1h",
      };
      const accessToken = sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        options
      );

      //   RESPONSE TO CLIENT
      return res
        .status(200)
        .json({ message: "LOGIN SUCCESS", accessToken: accessToken });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
  getUsers: async (req, res) => {
    try {
      const response = await User.findAll();
      return res
        .status(200)
        .json({ message: "GET USERS SUCCESSFULLY", data: response });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
  getUserByID: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await User.findOne({ where: { id: id } });
      if (!response) return res.status(404).json({ message: "USER NOT FOUND" });
      return res.status(200).json({ data: response.dataValues });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      // DESTRUCT PARAMS
      const { id } = req.params;

      //   CHECK ROLE
      if (req.user.role !== "ADMIN")
        return res.status(403).json({ message: "ADMIN ONLY" });

      // IF ADMIN
      const response = await User.destroy({ where: { id: id } });
      if (!response) return res.status(404).json({ message: "ID NOT FOUND" });
      return res.status(200).json({ message: `ID ${id} DELETED` });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
};
