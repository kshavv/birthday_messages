const reader=require('xlsx');


module.exports= readExcel=async (address)=>{
    
    const file = await reader.readFile(address);
    const sheets= file.SheetNames;
    let data = []

    for(let i = 0; i < sheets.length; i++)
    {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        
        temp.forEach((res) => {
            data.push(res)
        })
    }
    
    console.log(data);
}



