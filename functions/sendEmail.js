const nodemailer = require("nodemailer");
const config = require("config");

const ejs = require("ejs");
const fs = require("fs");

require("dotenv").config();

let transporter = nodemailer.createTransport({
  service:'gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.mailID,
    pass: process.env.mailPass,
  },
});

const sendEmail = async (name, batch, email) => {
  let files = fs.readdirSync("./views");
  let randomNumber = Math.floor(Math.random() * files.length + 1);
  console.log(randomNumber);
  const data = await ejs.renderFile(
    require("path").resolve(__dirname, "../views") +
      `/template${randomNumber}.ejs`,
    { name: name, batch: batch }
  );

  await transporter
    .sendMail({
      from: '"alumni" nodemail.112@gmail.com',
      to: email,
      subject: `Happy Birthday ${name}`,
      html: data,
    })
    .then((info) => {
      console.log(info.messageId);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendEmail;
