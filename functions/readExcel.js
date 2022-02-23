const reader = require("xlsx");
const fs = require("fs");

const readExcel = async (address) => {
  const file = await reader.readFile(address);
  const sheets = file.SheetNames;
  let data = [];

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }
  saveToFile(data);
};

const saveToFile = async (data) => {
  const dataString = JSON.stringify(data, null, 2);
  fs.writeFile("./data/jsonData/details.json", dataString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    }
    console.log("Successfully wrote file");
  });
};

/**
 * corrects the formatting of sheetName
 */
const correct_formatting = (sheetName) => {
  let comp = sheetName.split(" ");
  let correctName = "";
  comp.forEach((item) => {
    correctName += item;
  });
  return correctName;
};

module.exports = readExcel;
