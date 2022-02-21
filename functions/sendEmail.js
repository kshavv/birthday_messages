const nodemailer =require('nodemailer');
const config=require('config');

const ejs=require('ejs');
const fs = require('fs');

/**
 * testing feature
 */
let testAccount;
const newTestAccount=async ()=>{
    testAccount=await nodemailer.createTestAccount();
}
 
newTestAccount();


let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.get("mailID"), // generated ethereal user
      pass: config.get("mailPass"), // generated ethereal password
    },
});


// const sendEmail=async(name,batch,email)=>{
    
//     let randomNumber;
//     fs.readdir('./views',async(err, files) => {
//         if(err){
//             console.log(err);
//         }
//         randomNumber= Math.floor((Math.random() * files.length)+1);
//         const data= await ejs.renderFile(require('path').resolve(__dirname, '../views')+`\\template${randomNumber}.ejs`, { name:name,batch:batch });

//         let info = await transporter.sendMail({
//             from: '"ksav" ksav321@outlook.com', // sender address
//             to: email, // list of receivers
//             subject: "Birthday greetings", // Subject line
//             html:data
//           });

//         console.log(info.messageId)

//     });

// }


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
        from: '"ksav" ksav321@outlook.com', // sender address
        to: email, // list of receivers
        subject: "Birthday greetings", // Subject line
        html: data,
      })
      .then((info) => {
        console.log(info.messageId);
      }).catch((err)=>{
        console.log(err);
      });
  };


module.exports=sendEmail;