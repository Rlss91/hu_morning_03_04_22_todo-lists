const express = require("express");
const router = express.Router();

const authRoute = require("./api/auth");
const todoRoute = require("./api/todo");
const authMW = require("../middleware/auth.mw");

router.use("/auth", authRoute);
router.use("/todo", authMW, todoRoute);

router.get("/", (req, res) => {
  res.json("working");
});

module.exports = router;
