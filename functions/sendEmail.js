let config=require("config");
const mailer=require("nodemailer");

const mail="keshavrawat999.kr@gmail.com";
const pass=config.get("emailPass");



var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: mail,
      pass: pass
    }
  });

  var mailOptions = {
    from: mail,
    to: 'ksavr99@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };





  module.exports=sendEMail=()=>{

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

  }