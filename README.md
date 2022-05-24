# Alumni Project(Birthday greetings App)

## Installation
### **Installing all the dependencies**

1. Intall [node.js](https://nodejs.org/en/) on your local machine
2. fork and clone this repository on your local machine
3. go to the project directory in local machine
4. Open terminal in the project directory(*birthday_messages*) and change directory to the project directory.
    ```cd birthday_messages```
5. Run ```npm install```  to install all the dependencies required for the project

### **Setting up the environment file**
create a file named *.env* and put all the environment variables here according to the *ENV_SAMPLE* file
<sub>(ENV_SAMPLE) file is present in the repository</sub>

Here's the list of environment variables
- clientId
- clientSecret
- refreshToken
- driveRefreshToken
- jwtSecret
- user
- userPass

*The first 4 variables are needed to generate the access token to safely login into your Gmail account. This is required to use the mailing and google drive service*
***Follow [this](https://github.com/kshavv/birthday_messages/tree/feature-drive#setting-up-google-oauth) section to generate clientID,clientSecret and refresh token variables***

**For more information check the *ENV_SAMPLE* file in the repo**


### **Setting up google Oauth**
We are using Oauth to get access of the gmail account for sending mail and using google drive


After performing the above steps successfully. The application should be running without any error on your system



### adding new templates for birthday greetings 




## Running the application
## testing

### starting the script

### updating students data on server
#### Excel file format for uploading 



## deploying the project
any hosting service can be used 
environment variables
