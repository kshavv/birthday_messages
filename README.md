# Alumni Project(Birthday greetings App)

## Installation
### **Installing all the dependencies**

1. Intall [node.js](https://nodejs.org/en/) on your local machine
2. fork and clone this repository on your local machine
3. Open terminal in the project directory(**birthday_messages**) and change directory to the project directory.
    ```cd birthday_messages```
4. Run ```npm install```  to install all the dependencies required for the project

### **Setting up the environment file**
create a file named **.env** and put all the environment variables here according to the **ENV_SAMPLE** file<br />
<sub>(ENV_SAMPLE) file is present in the repository</sub>

Here's the list of environment variables
- clientId
- clientSecret
- mailRefreshToken
- driveRefreshToken
- jwtSecret
- user
- userPass

*The first 4 variables are needed to generate the access token to safely login into your Gmail account. This is required to use the mailing and google drive service*
***Follow [this](https://github.com/kshavv/birthday_messages/tree/feature-drive#setting-up-google-oauth)(Setting up google Oauth) section to generate clientID,clientSecret and refresh token variables***

**For more information about the environment variables check the *ENV_SAMPLE* file in the repo**


### **Setting up google Oauth**
We are using Oauth to login to the gmail account for sending mail and for accessing google drive.<br />
To generate client ID, Client secret and Refresh tokens for both mail and drive, refer to these videos :- <br />
1  [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2)
2  [How to send email using gmail API](https://www.youtube.com/watch?v=-rcRf7yswfM) <br />
3  [How to use Google drive Api to upload](https://www.youtube.com/watch?v=1y0-IfRW114) <br />

***You will require two seperate refresh tokens for gmail and drive.***

Once all the tokens are acquired. Put them in your *.env* file as mentioned in the above section<br />

*Important*<br />
Make sure **"Publishing status"** of your app is set to **"In Production"** in the **Oauth consent screen tab** of **Google cloud Platform**, otherwise the refresh token will expire after a week.


After all the environment variable are set, the application should run without any error.

## Running the application
For testing whether the program is working on the system-- <br />
- On **index.js** initialize the variable **TEST_MAIL** with your email address. This email address would act as a reciever to check if the program is working fine.
<br />
After the installation, to start running the program, open the terminal and enter `npm run server`. This will run the server on PORT 3000.
The program will automatically fetch the data of persons who have their birthday today and will start sending the mail.<br />
By default the server is running on **test mode**(means the process will run at an interval of 20 sec instead of running daily)<br />

### Adding new templates for birthday greetings 
- The html files should contain these placeholders **"<%=name%>"** and **"<%=batch%>"** so that the templating engine can remove them with name and batch.<sub>(refer to the test templates inside **emailTemplates** folder)</sub> <br/>
- Change the html template file format to **"ejs"** by simply replacing **".html"** with **".ejs"**<br/>
- The name of the template should be in serial order **eg: "template3.ejs" should be the name of the next template** <sub>(refer to the **"emailTemplates"** folder for naming templates)</sub><br/>. So that a random template can be picked by the program to send the email.

### Updating students data on server

Data can be manually updated by :- 
1 Changing the file **book.xlsx** in the **data** folder with another excel file of the same name and then 
2 setting **UPLOAD_FILE** variable in **index.js** file to true
3 Then by starting the server a JSON file of the updated **book.xlsx** file will be created

User can also update data by logging into the admin page and then simply dropping an excel file.

    #### Excel file format for uploading 
    The excel file  should atleast have these fields(the spelling should be exaclty the same as mentioned below)
    1 Student Name
    2 Date of Birth  -> in excel date format
    3 Email Id
    4 Batch 

## Deploying the project
To deploy the project set the **TEST_STATUS** variable inside the **index.js** to false. 
Make sure every environment variables are set on the deployment platform.