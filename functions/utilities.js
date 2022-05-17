const fs = require("fs");

module.exports=class Utilities{

    static sleep=(ms)=> {
        console.log("waiting...")
        return new Promise(resolve => setTimeout(resolve, ms));
    } 
    
    static isDataValid = (data) => {
        if (data.hasOwnProperty("Student Name") && data.hasOwnProperty("Email Id")){
            return true;
        }
        return false;
    };

    static formatNames=(name)=>{
        const nameComp=name.split(" ");
        let str="";
        nameComp.forEach(comp=>{
            comp=comp.toLowerCase();
            str+=comp.charAt(0).toUpperCase()+comp.slice(1);
            str+=" "
        })
        return str;
    }
    
    static getJsDateFromExcel=(excelDate)=> {
        return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    }
    
    static saveToFile = async (data) => {
        const dataString = JSON.stringify(data, null, 2);
        fs.writeFile("./data/jsonData/details.json", dataString, (err) => {
          if (err) {
            console.log("Error writing file", err);
          }
          console.log("Successfully wrote file");
        });
    };
}

