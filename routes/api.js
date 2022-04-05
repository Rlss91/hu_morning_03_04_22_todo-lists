const express = require("express");
const router = express.Router();

const authRoute = require("./api/auth");

router.use("/auth", authRoute);

router.get("/", (req, res) => {
  res.json("working");
});

module.exports = router;
