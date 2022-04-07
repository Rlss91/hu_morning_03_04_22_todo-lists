const express = require("express");
const router = express.Router();

const usersModule = require("../../models/users.model");
const usersValidation = require("../../validation/users.validation");
const bcrypt = require("../../config/bcrypt");
const jwt = require("../../config/jwt");
const randomNumber = require("../../util/randomNumber");
const nodemailer = require("../../config/nodemailer");

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

//better way
router.post("/forgetpassword", async (req, res) => {
  try {
    const validatedValue =
      await usersValidation.forgetPasswordSchema.validateAsync(req.body, {
        abortEarly: false,
      });
    const rnum = randomNumber(100000, 999999);
    //30             * 60      * 1000        = 1,800,000
    //minuts we want * seconds * miliseconds =
    const expDate = new Date(Date.now() + 1800000);
    console.log({ rnum, expDate });
    const usersUpdateInfo = await usersModule.updateRecoveryParams(
      validatedValue.email,
      rnum,
      expDate
    );
    // console.log({ usersUpdateInfo });
    if (
      usersUpdateInfo.matchedCount === 1 &&
      usersUpdateInfo.modifiedCount === 1
    ) {
      nodemailer(
        validatedValue.email,
        "Recover your password",
        `
      <p>to restart your password please enter to <a href="http://localhost:3000/api/auth/recoverypassword/${validatedValue.email}/${rnum}">this link</a></p>
      <p>http://localhost:3000/api/auth/recoverypassword/${validatedValue.email}/${rnum}</p>
      `
      );
    }
    res.json({ msg: "link send to your email" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/recoverypassword/:email/:recoveyNumber", async (req, res) => {
  try {
    const validatedValue =
      await usersValidation.recoverPassworSchema.validateAsync(
        { ...req.body, ...req.params },
        {
          abortEarly: false,
        }
      );
    const users = await usersModule.selectUserByEmail(validatedValue.email);
    if (users.length > 0) {
      if (users[0].randomRecoveryNumber == validatedValue.recoveyNumber) {
        const nowDT = new Date();
        console.log({
          nowDT,
          user: users[0],
          time: users[0].dateRecoveryNumber.getTime(),
        });
        if (nowDT.getTime() <= users[0].dateRecoveryNumber.getTime()) {
          const hashPassword = await bcrypt.createHash(validatedValue.password);
          const usersUpdateInfo = await usersModule.updatePassword(
            validatedValue.email,
            hashPassword
          );
          if (
            usersUpdateInfo.matchedCount === 1 &&
            usersUpdateInfo.modifiedCount === 1
          ) {
            return res.json({ msg: "password updated" });
          }
        }
      }
    }
    throw "something went wrong";
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ err });
  }
});

module.exports = router;
