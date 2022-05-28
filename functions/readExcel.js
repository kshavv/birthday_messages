const reader = require("xlsx");
const Utilities=require('../functions/utilities')
const {uploadFile}=require('./driveFunctions')

const readExcel = async () => {
  const address=require("path").resolve(__dirname, "../data/book.xlsx");
  const file = await reader.readFile(address);
  const sheets = file.SheetNames;
  let data = [];
    
  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }
  await Utilities.saveToFile(data,'details.json');
  await uploadFile('details.json');
};


module.exports = readExcel;
