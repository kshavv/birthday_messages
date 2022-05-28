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
    
    static saveToFile = async (data,filename) => {
        const dataString = JSON.stringify(data, null, 2);
        fs.writeFile(`./data/jsonData/${filename}`, dataString, (err) => {
          if (err) {
            console.log("Error writing file "+filename, err);
          }
          console.log("Successfully wrote file -> "+filename);
        });
    };

    static printList=(list)=>{
        console.log("FETCHING LIST...");
        this.sleep(1000);
        list.forEach(x=>{
            console.log("NAME --> "+x["Student Name"]);
            console.log("BRANCH --> "+x["Branch"]);
            console.log("EMAIL --> "+x["Email Id"]);
            console.log("\n");
        })
        console.log("\n");
    }

    static alumniCount=()=>{
        const data = require("../data/jsonData/details.json");
        let count=data.length;
        delete require.cache[require.resolve('../data/jsonData/details.json')];
        return count;
    }

    static cronTiming=(test_status)=>{
        if(test_status)
            return "*/20 * * * * *";
        return "0 8 * * * ";
    }

    static getMime(filename){
        const type=filename.split('.')[1];
        if(type=="json")
            return "application/json";
        if(type=="txt")
            return "text/plain"
    }
    static getLogForMail=(name,batch,email,dob)=>{
        let d = new Date();
        let timestamp = d.getTime();
        let newLog={
            "timestamp":timestamp,
            "name":name,
            "batch":batch,
            "email":email,
            "DOB":dob
        };
        return newLog;

    }
    static addNewEntries=async(newEntry,filename)=>{
        const data = require(`../data/jsonData/${filename}`);
     
        data.push(newEntry)
        let updatedData = JSON.stringify(data,null,2);
        fs.writeFile(`./data/jsonData/${filename}`, updatedData, (err) => {
            if (err) 
            console.log(err);
            console.log("Local file("+filename+") Updated");
        });
        
        delete require.cache[require.resolve(`../data/jsonData/${filename}`)];
    }
}

