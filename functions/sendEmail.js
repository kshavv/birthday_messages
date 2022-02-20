const nodemailer =require('nodemailer');
const hbs=require("nodemailer-express-handlebars");

const config=require('config');

const fs = require('fs');

/**
 * testing feature
 */
// let testAccount;
// const newTestAccount=async ()=>{
//     testAccount=await nodemailer.createTestAccount();
// }
 
// newTestAccount();


let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.get("mailID"), // generated ethereal user
      pass: config.get("mailPass"), // generated ethereal password
    },
});

transporter.use('compile',hbs({
    viewEngine:'express-handlebars',
    viewPath:'../birthday_messages/views'

}));


const sendEmail= async (name,batch,email)=>{

    let randomNumber;
    fs.readdir('./views',async(err, files) => {
        if(err){
            console.log(err);
        }
        randomNumber=Math.floor((Math.random() * files.length)+1);
        
    
        let info = await transporter.sendMail({
            from: '"ksav" ksav321@outlook.com', // sender address
            to: email, // list of receivers
            subject: "Birthday greetings", // Subject line
            template:`template${randomNumber}`
          });

    });

}


module.exports=sendEmail;