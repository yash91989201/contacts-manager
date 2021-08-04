const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.userJWT;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const userData = await User.findOne({ _id: verifyUser._id });
    req.token = token;
    req.userData = userData;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `${error.type} , ${error.meaasge}`,
      data: null,
    });
  }
};

module.exports = auth;
