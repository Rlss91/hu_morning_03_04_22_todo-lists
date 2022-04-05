const express = require("express");
const router = express.Router();

const usersModule = require("../../models/users.model");
const usersValidation = require("../../validation/users.validation");
const bcrypt = require("../../config/bcrypt");
const jwt = require("../../config/jwt");

//http://localhost:3000/api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const validatedValue = await usersValidation.signupSchema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    const users = await usersModule.selectUserByEmail(validatedValue.email);
    // console.log("signup user", users)
    if (users.length === 0) {
      const hashPassword = await bcrypt.createHash(validatedValue.password);
      const newuser = await usersModule.insertUser(
        validatedValue.firstname,
        validatedValue.lastname,
        validatedValue.email,
        hashPassword,
        validatedValue.phone
      );
      res.json({ msg: "user created" });
    } else {
      throw "email already exist";
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

//http://localhost:3000/api/auth/login
router.post("/login", async (req, res) => {
  try {
    const validatedValue = await usersValidation.loginSchema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    const users = await usersModule.selectUserByEmail(validatedValue.email);
    if (users.length > 0) {
      const hashResult = await bcrypt.cmpHash(
        validatedValue.password,
        users[0].password
      );
      if (hashResult) {
        const token = await jwt.generateToken({
          _id: users[0]._id,
          email: users[0].email,
        });
        res.json({ token });
      } else {
        throw "email or password incorrect";
      }
    } else {
      throw "email or password incorrect";
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
