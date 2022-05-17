const express = require("express");
const app = express();
const getTodaysList = require("./functions/getBirthdayList");
const schedule = require("node-schedule");
const sendEmail = require("./functions/sendEmail");
const cookie=require("cookie-parser");
const Utilities=require('./functions/utilities');

app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/client'));
app.use(cookie());

// */30 * * * * *   0 8 * * *
const job = schedule.scheduleJob("0 8 * * * ", async function () {
  console.log("starting on schedule...");
  const list = getTodaysList();
  console.log(list);  
  
  for(let i=0;i<list.length;i++){
    if (Utilities.isDataValid(list[i])) {
      await sendEmail(list[i]["Student Name"],list[i]["Batch"],"keshavrawat999.kr@gmail.com");
      await Utilities.sleep(3000);
    } 
    else 
      console.log("data is invalid\nReconfiguring...");
  }
  console.log("Done");
});

//defining route
app.use('/',require('./routes/api'));

//starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
