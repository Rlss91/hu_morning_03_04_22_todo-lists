const express = require("express");
const router = express.Router();

const authRoute = require("./api/auth");
const todoRoute = require("./api/todo");
const authMW = require("../middleware/auth.mw");

router.use("/auth", authRoute);
router.use("/todo", authMW, todoRoute);

module.exports = router;
