const reader=require('xlsx');
const fs=require('fs');

module.exports= readExcel=async (address)=>{
    
    const file =await reader.readFile(address);
    const sheets=file.SheetNames;
    let data = [];

    for(let i = 0; i < sheets.length; i++)
    {
        const sheet={
            NameOfSheet:correct_formatting(sheets[i]),
            sheetData:[]
        }

        data.push(sheet);
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        temp.forEach((res) => {
            data[i].sheetData.push(res);
        })

        // console.log(data);

    }

    saveToFile(data);
}

 
const saveToFile= async (data)=>{

    data.forEach(sheet=>{
        const dataString=JSON.stringify(sheet.sheetData,null,2);
        fs.writeFile('./data/jsonData/'+sheet.NameOfSheet+'.json',dataString,err=>{
            if (err) {
                console.log('Error writing file', err)
            } 
            console.log('Successfully wrote file')
            
        })   
    })
    

}



/**
 * corrects the formatting of sheetName 
 */
const correct_formatting=(sheetName)=>{

    let comp=sheetName.split(' ');
    let correctName="";
    comp.forEach(item=>{
        correctName+=item;
    })

    return correctName;
}
