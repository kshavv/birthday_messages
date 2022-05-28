const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const Utilities=require('../functions/utilities')
const {uploadFile,updateFile}=require('./driveFunctions')

require("dotenv").config();


const oauth2Client = new OAuth2(
  process.env.clientId, 
  process.env.clientSecret,
  "https://developers.google.com/oauthplayground" // Redirect URL
);


oauth2Client.setCredentials({
  refresh_token: process.env.mailRefreshToken
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "nodemail.112@gmail.com", 
       clientId: process.env.clientId,
       clientSecret: process.env.clientSecret,
       refreshToken: process.env.mailRefreshToken,
       accessToken: accessToken
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (name, batch, email,dob) => {

  name=Utilities.formatNames(name);
  //randomly selecting a template
  let files = fs.readdirSync("./emailTemplates");
  let randomNumber = Math.floor(Math.random() * files.length + 1);
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
      console.log("sending mail to: "+name);
      console.log("message ID: "+info.messageId+"\n");
    })
    .catch((err) => {
      console.log(err);
    });
  const logEntry=Utilities.getLogForMail(name,batch,email,dob);
  await updateFile(logEntry,'emailLogs.json');
  await uploadFile('emailLogs.json');
};

module.exports = sendEmail;
