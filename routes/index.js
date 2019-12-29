const express = require("express");
const router = express.Router();
const usersRoute = require("./users");
const authRoute = require("./auth");

router.use("/users", usersRoute);
router.use("/auth", authRoute);

module.exports = router;
