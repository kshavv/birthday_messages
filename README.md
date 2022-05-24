# Alumni Project(Birthday greetings App)

## Installation
### **Installing all the dependencies**

1. Intall [node.js](https://nodejs.org/en/) on your local machine
2. fork and clone this repository on your local machine
3. Open terminal in the project directory(*birthday_messages*) and change directory to the project directory.
    ```cd birthday_messages```
4. Run ```npm install```  to install all the dependencies required for the project

### **Setting up the environment file**
create a file named *.env* and put all the environment variables here according to the *ENV_SAMPLE* file
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
We are using Oauth to get access of the gmail account for sending mail.
For generating client ID, Client secret and Refresh token for both mail and google drive, refer to these videos to :-
1  [How to send email using gmail API](https://www.youtube.com/watch?v=-rcRf7yswfM) 
2  [How to use Google drive Api to upload](https://www.youtube.com/watch?v=1y0-IfRW114) 

***You will require two seperate refresh tokens for gmail and drive.***

Once all the tokens are acquired. Put them in your *.env* file

*Important*
Make sure **Publishing status** of your app is set to **In Production** in the Oauth consent screen tab of Google cloud Platform, otherwise the refresh token will expire after a week.


After all the environment variable are set, the application should run without any error.

## Running the application
After the installation is done. Open the terminal and enter `npm run server`. This will run the server on PORT 3000.


## testing

### starting the script

### adding new templates for birthday greetings 
### updating students data on server
#### Excel file format for uploading 



## deploying the project
any hosting service can be used 
environment variables
