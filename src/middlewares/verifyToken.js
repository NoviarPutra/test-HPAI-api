const { verify } = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const headers = req.headers;
    const token = headers.authorization && headers.authorization.split(" ")[1];
    if (token === null)
      return res.status(401).json({ message: "YOUR TOKEN IS NULL" });
    verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) return res.status(403).json({ message: "ACCESS DENIED" });
      req.user = decoded;
      next();
    });
  },
};
