const express =require("express");
const app=express();

const readExcel=require("./functions/readExcel");


//setting up the express server
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
});



//calling function for reading excel
readExcel("./data/book.xlsx");

