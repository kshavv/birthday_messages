const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const Utilities=require('../functions/utilities')
require("dotenv").config();


const oauth2Client = new OAuth2(
  process.env.clientId, 
  process.env.clientSecret,
  "https://developers.google.com/oauthplayground" // Redirect URL
);


oauth2Client.setCredentials({
  refresh_token: process.env.refreshToken
});
const accessToken = oauth2Client.getAccessToken()


const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "nodemail.112@gmail.com", 
       clientId: process.env.clientId,
       clientSecret: process.env.clientSecret,
       refreshToken: process.env.refreshToken,
       accessToken: accessToken
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (name, batch, email) => {

  name=Utilities.formatNames(name);
  //randomly selecting a template
  let files = fs.readdirSync("./emailTemplates");
  let randomNumber = Math.floor(Math.random() * files.length + 1);
  console.log(randomNumber);
  const data = await ejs.renderFile(
    require("path").resolve(__dirname, "../emailTemplates") +
      `/template${randomNumber}.ejs`,
    { name: name, batch: batch }
  );
  //sending the email
  await smtpTransport
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

module.exports = sendEmail;
