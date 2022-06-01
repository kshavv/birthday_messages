const express = require("express");
const app = express();
const getTodaysList = require("./functions/getBirthdayList");
const schedule = require("node-schedule");
const sendEmail = require("./functions/sendEmail");
const cookie=require("cookie-parser");
const Utilities=require('./functions/utilities');
const readExcel=require('./functions/readExcel');
const {fetchDriveFile}=require('./functions/driveFunctions')

app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/client'));
app.use(cookie());  

const UPLOAD_FILE=false;
const TEST_STATUS=true;  //set this to "true" for testing 
const TEST_EMAIL="keshavrawat999.kr@gmail.com"  //receiver email used for testing when "TEST_STATUS" is set to "true"

if(UPLOAD_FILE)
  readExcel();

const job = schedule.scheduleJob(Utilities.cronTiming(TEST_STATUS), async function () {
  console.log("starting on schedule...");
  //fetching the details.json file
  await fetchDriveFile('details.json')
  const list = await getTodaysList();
  Utilities.printList(list); 
  
  //updating the local log file from drive, before starting
  await fetchDriveFile('emailLogs.json');


  for(let i=0;i<list.length;i++){
    let name=list[i]["Student Name"];
    let batch=list[i]["Batch"];
    let email=list[i]["Email Id"];
    let dob=list[i]["Date of Birth"];

    if (Utilities.isDataValid(list[i])) {
      if(TEST_STATUS)
        email=TEST_EMAIL;
      await sendEmail(name,batch,email,dob);
      await Utilities.sleep(1000);
    } 
    else{
      console.log("data is invalid\n")
      console.log("Check the spellings inside excel file and reupload\nReconfiguring...");
    } 

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
