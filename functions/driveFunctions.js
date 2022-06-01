require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const path = require('path');
const fs = require('fs');
const Utilities=require('../functions/utilities')

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =process.env.driveRefreshToken;

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


const checkFileExists=async(filename,mime)=>{
    const response=await drive.files.list({
        q: `mimeType='${mime}' and name='${filename}' and trashed=false`,
        spaces:'drive'
    })
    if(response.data.files.length!=0)
        return response;
    return -1;
}

const uploadFile= async(filename)=> {
    try{
        const filePath = path.join(__dirname, `../data/jsonData/${filename}`);
        const mime=Utilities.getMime(filename);
        const filePresent=await checkFileExists(filename,mime);
        if(filePresent == -1){
            const response = await drive.files.create({
            requestBody: {
                name: filename, //file name
                mimeType: mime,
            },
            media: {
                mimeType: mime,
                body: fs.createReadStream(filePath),
                },
            }); 
            console.log(filename+" uploaded on Drive");
        }
        else{
            const response=await drive.files.update({
                fileId: filePresent.data.files[0].id,
                media:{
                    mimeType: mime,
                    body: fs.createReadStream(filePath),
                }
            });
            console.log(filename+" updated on drive\n");
            await Utilities.sleep(1000)
        }            
    }catch (error) {
        console.log(error.message);
    }
} 

const fetchDriveFile=async(filename)=>{
    const filePath = path.join(__dirname, `../data/jsonData/${filename}`);
    const mime=Utilities.getMime(filename);
    const filePresent=await checkFileExists(filename,mime);
    if(filePresent != -1){
        // if file is present on the drive
        let fileId=filePresent.data.files[0].id;
        let dest =fs.createWriteStream(filePath);
        drive.files.get({fileId: fileId, alt: "media"}, {responseType: "stream"},
        function(_err, res){
            res.data
            .on("end", () => {

            })
            .on("‘error’", err => {
                console.log("‘Error’:", err);
            })
            .pipe(dest);
        })
    }
    await Utilities.sleep(2000);
}


module.exports={uploadFile,fetchDriveFile};