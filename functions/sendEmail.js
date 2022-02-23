const nodemailer = require("nodemailer");
const config = require("config");

const ejs = require("ejs");
const fs = require("fs");

let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: config.get("mailID"),
    pass: config.get("mailPass"),
  },
});

const sendEmail = async (name, batch, email) => {
  let files = fs.readdirSync("./views");
  let randomNumber = Math.floor(Math.random() * files.length + 1);
  console.log(randomNumber);
  const data = await ejs.renderFile(
    require("path").resolve(__dirname, "../views") +
      `\\template${randomNumber}.ejs`,
    { name: name, batch: batch }
  );

  await transporter
    .sendMail({
      from: '"ksav" ksav321@outlook.com',
      to: email,
      subject: "Birthday greetings", 
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
