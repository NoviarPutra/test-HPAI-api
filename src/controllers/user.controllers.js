const { hashSync } = require("bcrypt");
const User = require("../models/user.models");

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
};
