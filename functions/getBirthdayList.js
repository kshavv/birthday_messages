const data = require("../data/jsonData/details.json");

module.exports = getTodaysList = () => {
  let listofBirthdays = [];
  let today = new Date();

  const tdate = today.getDate();
  const tmonth = today.getMonth() + 1;

  data.forEach((elem) => {
    let y = getJsDateFromExcel(elem["Date of Birth"]);
    if (tdate == y.getDate() && tmonth == y.getMonth() + 1) {
      listofBirthdays.push(elem);
    }
  });

  return listofBirthdays;
};

function getJsDateFromExcel(excelDate) {
  return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
}
