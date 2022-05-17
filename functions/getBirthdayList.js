const Utilities=require('../functions/utilities')

module.exports = getTodaysList = () => {
  let listofBirthdays = [];
  let today = new Date();

  const tdate = today.getDate();
  const tmonth = today.getMonth() + 1;

  const data = require("../data/jsonData/details.json");

  data.forEach((elem) => {
    let y = Utilities.getJsDateFromExcel(elem["Date of Birth"]);
    if (tdate == y.getDate() && tmonth == y.getMonth() + 1)
      listofBirthdays.push(elem);
  });

  delete require.cache[require.resolve('../data/jsonData/details.json')];

  return listofBirthdays;
};



