require("dotenv").config();
const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  service: "yahoo",
  secure: false,
  auth: {
    user: "rlss91",
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
