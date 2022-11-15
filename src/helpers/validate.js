module.exports = {
  validateSignUp: (req, res, next) => {
    const { name, email, password, role } = req.body;
    if (name === "" || name === undefined) {
      return res.status(400).json({ message: "NAME CAN NOT BE EMPTY !" });
    } else if (email === "" || email === undefined) {
      return res.status(400).json({ message: "EMAIL CAN NOT BE EMPTY !" });
    } else if (password === "" || password === undefined) {
      return res.status(400).json({ message: "PASSWORD CAN NOT BE EMPTY !" });
    } else if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "PASSWORD MUST BE > 6 CHARACTERS" });
    } else if (role === "" || role === undefined) {
      return res.status(400).json({ message: "ROLE CAN NOT BE EMPTY !" });
    }
    req.body.role = req.body.role.toUpperCase();
    next();
  },
  validateSignIn: (req, res, next) => {
    const { email, password } = req.body;
    if (email === "" || email === undefined) {
      return res.status(400).json({ message: "EMAIL CAN NOT BE EMPTY !" });
    } else if (password === "" || password === undefined) {
      return res.status(400).json({ message: "PASSWORD CAN NOT BE EMPTY !" });
    }
    next();
  },
};
