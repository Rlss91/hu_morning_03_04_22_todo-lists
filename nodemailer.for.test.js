require("dotenv").config();
const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SEND_EMAIL,
    pass: process.env.SEND_PASSWORD,
  },
  debug: false,
  logger: true,
});

const sendMail = async () => {
  let info = await emailTransporter.sendMail({
    from: `"Fred Foo 👻" <${process.env.SEND_EMAIL}>`, // sender address
    to: process.env.SEND_EMAIL, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};

sendMail()
  .then((data) => {
    console.log("data", data);
  })
  .catch((err) => {
    console.log("err", err);
  });
