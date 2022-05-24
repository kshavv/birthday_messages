require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const path = require('path');
const fs = require('fs');

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04mIqF1rZ9KJmCgYIARAAGAQSNwF-L9Ir3HdgZN5r7sx7dkEz13QfHfgNtLjBz3D9LSzHCoSLMdeofQ9wYtI5MFCZP8hf2T_tdes'


const oauth2Client = new OAuth2(
    process.env.clientId,
    process.env.clientSecret,
    REDIRECT_URI
);


oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//initialize google drive
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

const filePath = path.join(__dirname, '../data/jsonData/details.json');


const checkFileExists=async()=>{
    const response=await drive.files.list({
        q: "mimeType='application/json' and name='details.json' and trashed=false",
        spaces:'drive'
    })
    if(response.data.files.length!=0)
        return response;
    return -1;
}

//function to upload the file
async function uploadFile(filename) {
    try{
        const filePresent=await checkFileExists(filename);
        if(filePresent == -1){
            const response = await drive.files.create({
            requestBody: {
                name: 'details.json', //file name
                mimeType: 'application/json',
            },
            media: {
                mimeType: 'application/json',
                body: fs.createReadStream(filePath),
                },
            }); 
        }
        else{
            console.log(filePresent.data.files[0].id)
            const response=await drive.files.update({
                fileId: filePresent.data.files[0].id,
                media:{
                    mimeType: 'application/json',
                    body: fs.createReadStream(filePath),
                }
            });

            console.log("file updated");
        }            


    }catch (error) {
        //report the error message
        console.log(error.message);
    }
} 


module.exports=uploadFile;