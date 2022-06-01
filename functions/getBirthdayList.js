const Utilities=require('../functions/utilities')
const {fetchDriveFile}=require('./driveFunctions')


module.exports = getTodaysList = async() => {
  let listofBirthdays = [];
  let today = new Date();
  
  const tdate = today.getDate();
  const tmonth = today.getMonth() + 1;
  try{
    const data=require("../data/jsonData/details.json");
    
    data.forEach((elem) => {
      let y = Utilities.getJsDateFromExcel(elem["Date of Birth"]);
      if (tdate == y.getDate() && tmonth == y.getMonth() + 1)
      listofBirthdays.push(elem);
    });
    delete require.cache[require.resolve('../data/jsonData/details.json')];
  }
  catch(err){
    console.log(err);
  }    
  return listofBirthdays;
};



