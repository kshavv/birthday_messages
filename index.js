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

  res.send("seding mail");
})

//run the script //   0 10 * * *
const job = schedule.scheduleJob("*/30 * * * * *", async function () {
  console.log("starting...");
  const list = getTodaysList();
  console.log(list);
  if(list.length==0)
    return;

  if (isDataValid(list[0])) {
    await sendEmail(
      list[0]["Student Name"],
      list[0]["Batch"],
      "keshavrawat999.kr@gmail.com"
    );
    console.log("done!!");
  } else {
    console.log("data is invalid");
    console.log("re-configuring");
  }
});

const isDataValid = (data) => {
  if (data.hasOwnProperty("Student Name") && data.hasOwnProperty("Email Id"))
    return true;

  return false;
};
