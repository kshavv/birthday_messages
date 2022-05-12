const nodemailer = require("nodemailer");
const config = require("config");

const ejs = require("ejs");
const fs = require("fs");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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
  name=formatNames(name);
  let files = fs.readdirSync("./views");
  let randomNumber = Math.floor(Math.random() * files.length + 1);
  console.log(randomNumber);
  const data = await ejs.renderFile(
    require("path").resolve(__dirname, "../views") +
      `/template${randomNumber}.ejs`,
    { name: name, batch: batch }
  );
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


const formatNames=(name)=>{
  const nameComp=name.split(" ");
  let str="";
  nameComp.forEach(comp=>{
    comp=comp.toLowerCase();
    str+=comp.charAt(0).toUpperCase()+comp.slice(1);
    str+=" "
  })
  return str;
}

module.exports = sendEmail;
