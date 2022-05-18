const fs = require("fs");

module.exports=class Utilities{

    static sleep=(ms)=> {
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

    static printList=(list)=>{
        console.log("FETCHING LIST...");
        this.sleep(1000);
        list.forEach(x=>{
            console.log("\n");
            console.log("NAME --> "+x["Student Name"]);
            console.log("BRANCH --> "+x["Branch"]);
            console.log("EMAIL --> "+x["Email Id"]);
        })
        console.log("\n");
    }

    static alumniCount=()=>{
        const data = require("../data/jsonData/details.json");
        let count=data.length;
        delete require.cache[require.resolve('../data/jsonData/details.json')];
        return count;
    }
}

