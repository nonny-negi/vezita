const { auth } = require("firebase-admin");
const User = require("../models/userModel");
const { getAuth, signInWithCustomToken } = require("firebase/auth");
require("../utils/firebaseConfig");
require("dotenv").config();
exports.verifyToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: false,
        msg: "You are not logged in! Please log in to get access.",
      });
    }

    const decodedToken = await auth().verifyIdToken(token);

    req.fbuser = decodedToken;
    console.log(decodedToken);
    const user = await User.findOne({ uid: decodedToken.uid });
    if (!user) {
      return res.status(400).json({
        status: false,
        msg: "User Not Registered.",
      });
    }
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      msg: err.message,
    });
  }
  next();
};

exports.onboardVerifyToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: false,
        msg: "You are not logged in! Please log in to get access.",
      });
    }

    const decodedToken = await auth().verifyIdToken(token);

    req.fbuser = decodedToken;
    const user = await User.findOne({ uid: decodedToken.uid });
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: true,
      msg: err.message,
    });
  }
  next();
};

exports.generateToken = async (req, res, next) => {
  try {
    const token = await auth().createCustomToken(req.params.uid);
    const user = await signInWithCustomToken(getAuth(), token);
    const idToken = user._tokenResponse.idToken;

    return res.status(200).json({
      status: true,
      token: idToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      msg: err.message,
    });
  }
};
