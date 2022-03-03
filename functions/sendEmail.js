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
  name=formatNames(name);
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
      subject: `Happy Birthday ${name} --from G.B Pant Govt Engineering College`,
      html: data,
    })
    .then((info) => {
      console.log(info.messageId);
    })
    .catch((err) => {
      console.log(err);
    });
};


const formatNames=(name)=>{
  name=name.toLowerCase();
  const str=name.charAt(0).toUpperCase()+name.slice(1);
  return str;

}

module.exports = sendEmail;
