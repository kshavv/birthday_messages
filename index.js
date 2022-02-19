const express =require("express");
const app=express();

const readExcel=require("./functions/readExcel");
const sendMail=require("./functions/sendEmail");
const getTodaysList=require("./functions/getBirthdayList")

const schedule = require('node-schedule');




//setting up the express server
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
});


//calling function for reading excel
// readExcel("./data/book.xlsx");


//run the script //   0 10 * * *
const job = schedule.scheduleJob('*/10 * * * * *', function(){
        const list=getTodaysList();
        console.log(list);
    });