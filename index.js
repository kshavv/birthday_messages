const express = require("express");
const app = express();

const readExcel = require("./functions/readExcel");
const getTodaysList = require("./functions/getBirthdayList");

const schedule = require("node-schedule");
const sendEmail = require("./functions/sendEmail");

const fs = require("fs");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});


app.get('/',(req,res)=>{

  res.send("sending mail(production)");
})

//0 8 * * *
const job = schedule.scheduleJob("0 8 * * *", async function () {
  
  console.log("starting on schedule...");
  const list = getTodaysList();
  console.log(list);
  
  if(list.length==0) 
    return;

  for(let i=0;i<list.length;i++){
    if (isDataValid(list[i])) {
      await sendEmail(
        list[i]["Student Name"],
        list[i]["Batch"],
        "keshavrawat999.kr@gmail.com"
      );
      await sleep(4000);
    } 
    else {
      console.log("data is invalid");
      console.log("re-configuring");
    }
  }
  console.log("Done!");
});

const isDataValid = (data) => {
  if (data.hasOwnProperty("Student Name") && data.hasOwnProperty("Email Id"))
    return true;

  return false;
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
