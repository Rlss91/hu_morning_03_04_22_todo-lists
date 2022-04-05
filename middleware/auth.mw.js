const jwt = require("../config/jwt");

module.exports = async (req, res, next) => {
  try {
    req.userData = await jwt.verifyToken(req.headers.token);
    next();
  } catch (err) {
    res.status(400).json({ err: "invalid token" });
  }
};
