const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;

const withAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.body.username = decoded.username;
        next();
      }
    });
  }
};

router.get("/checkToken", withAuth, (req, res) => {
  res.status(200).send("Authorized");
});

module.exports = router;
