const data = require("../data/jsonData/details.json");
const Utilities=require('../functions/utilities')

module.exports = getTodaysList = () => {
  let listofBirthdays = [];
  let today = new Date();

  const tdate = today.getDate();
  const tmonth = today.getMonth() + 1;

  data.forEach((elem) => {
    
    let y = Utilities.getJsDateFromExcel(elem["Date of Birth"]);
    if (tdate == y.getDate() && tmonth == y.getMonth() + 1)
      listofBirthdays.push(elem);

  });
  
  return listofBirthdays;
};



