const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SEND_EMAIL,
    pass: process.env.SEND_PASSWORD,
  },
  debug: false,
  logger: false,
});

const sendMail = async (toEmail, subject, html) => {
  return emailTransporter.sendMail({
    from: `"Fred Foo 👻" <${process.env.SEND_EMAIL}>`, // sender address
    to: toEmail, // list of receivers
    subject: subject, // Subject line
    // text: "Hello world?", // plain text body
    html: html, // html body
  });
};

module.exports = sendMail;
