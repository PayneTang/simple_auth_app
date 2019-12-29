const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  createNewUser,
  selectAllUsers,
  userLogin,
  deleteUser
} = require("../db_operations/users");

const secret = process.env.SECRET_KEY;

// Get all users
router.get("/", (req, res) => {
  selectAllUsers(result => {
    res.send(result);
  });
});

// Delete user
router.delete("/", async (req, res) => {
  const username = req.body.username;
  deleteUser(username, result => {
    if (!result.affectedRows) {
      res.send({ success: false, message: "user not found" });
    } else {
      res.send({ success: true, message: "user deleted" });
    }
  });
});

// Create user
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  createNewUser(username, hashedPassword, result => {
    res.send(result);
  });
});

// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  userLogin(username, async result => {
    if (!result.success) {
      // User not found
      res.send(result);
    } else {
      // User found and start to verify
      const user = result.data;
      const compareResult = await bcrypt.compare(password, user.password);
      if (!compareResult) {
        res.send({
          success: false,
          message: "login failed, password incorrect!"
        });
      } else {
        const payload = { username };
        const token = jwt.sign(payload, secret, { expiresIn: "10s" });
        res
          .cookie("token", token, {
            httpOnly: true
          })
          .sendStatus(200);
      }
    }
  });
});

module.exports = router;
