const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
        const error = new Error("Authentication failed!");
        error.statusCode = 401;
        throw error;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }

};