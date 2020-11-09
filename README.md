# psych-survey

This repo is a template for COGS department surveys.

## Stack
Instead of a single html page, this repo works as a Node.js Express server to
1) Serve the html page with JsPsych
2) Receive data and securely write it to the database

The reason for doing this is security. With client-side database writing (php scripts called by JsPsych), the database credentials are exposed to the user. As such, all survey data could be exposed to any user. By insulating the database writing and running it on a server, rather than client-side, the database is protected. 



This repo is designed for deployment to AWS Elastic Beanstalk deployment for Node.js apps. 

## Requirements

### Development

To develop this code, you must have minimal Javascript dev experience
 - Node.js installed, version >= 12. Download at https://nodejs.org/en/download/
 - Yarn installed, download most recent version at https://classic.yarnpkg.com/en/docs/install/#mac-stable
 - Git for the command line https://git-scm.com/downloads

 
### Deployment 
 - Install the EC CLI (Elastic Beanstalk Command Line Interface) https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html
    - More instructions found here https://github.com/aws/aws-elastic-beanstalk-cli-setup
    - This is tricky, on Mac make sure your Xcode Command Line Tools are installed https://www.embarcadero.com/starthere/xe5/mobdevsetup/ios/en/installing_the_commandline_tools.html
 
 ## Startup
 
 NOTE: Do not clone and edit this repo, instead follow these instructions. 
 1) Create a new github repository, clone it to your machine
 2) Add this template as a git remote with `git remote add template https://github.com/nathan-m-schneider-22/psych-survey.git`
 3) Pull the template code into your repo with `git pull template main --allow-unrelated-histories`
 4) Locally install the necessary packages with `yarn`
 5) Add your `.env` file to the top-level-directory, which contains the database login credentials, in the form of 
 ```
DBUSER=phillab
PASSWORD=gyubin974hf08nc
HOST=consideration-sets.cfahjwyzytn4.us-east-2.rds.amazonaws.com
DATABASE=consideration
```
 6) To run the server, run `yarn start`. You should see 
 ```
 listening on: 9090
Connected to database!
```
7) To see the page navigate to http://localhost:9090 

Once the server is up and running, you can edit the files, see below for code methodology. 

## Code Methodology
This repo, if used correctly allows for quick development and deployment of database-writing JsPsych surveys. Below is an overview of the files 
 - [server.js](server.js) Main code for managing the the sending of files and receiving information. Only edit if you need to alter the flow of 
    1) Server gives client survey
    2) Client POST server the survey data
 - [public/index.html](public/index.html) This is your main file for writing JsPsych surveys. The current version contains the necessary parts for sending data
 ```
     jsPsych.init({
        timeline,
        on_finish: function() {
            jsPsych.data.displayData();
            save_data(jsPsych.data.get().values());
        }
    })
```
This runs the timeline, then save_data sends it to the server. 
```    
function save_data(data) {
        url = location+"data"
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            data
        }));
    }
```
 - [public/custom_package.js](public/custom_package.js) Any extra code you need for the survey can be placed here and run. 
 - [parseData.js](parseData.js) This file is for processing the raw JSON data send from the survey, and returning a single SQL query for inserting the necessary values. See https://www.sqlservertutorial.net/sql-server-basics/sql-server-insert-multiple-rows/ fSetup the environment with or more info 
 
 
 ## Deployment
 Once you have installed the EB CLI, (contact me if having trouble with that), follow these steps to deploy it to AWS. This process follows [this](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html) approach. 
 
 0) You may have to login with your AWS secret keys, find them [here](https://console.aws.amazon.com/iam/home?region=us-east-2#/security_credentials)
 1) Initialize with `eb init --platform node.js --region us-east-2`
 2) Setup the environment with `eb create --sample node-express-env`, wait several minutes for this to finish
 3) Deploy to the environment with `eb deploy`
 4) You will still be unable to view to page, as you have not added the environment variables. To add them go to 
   - AWS Elastic Beanstalk Dashboard online
   - Go to the node-express-env environment
   - Navigate to Configuration, then Software, then Environment properties
   - Enter each variable from your `.env` file, it should look like this:
   - <img width="1076" alt="Screen Shot 2020-11-09 at 5 04 50 PM" src="https://user-images.githubusercontent.com/48935297/98601973-c1bce200-22ad-11eb-9f2d-ca81a42fe400.png">
  5) Once the environment updates, go back and enter `eb open` to view the app. This URL is now accessible everywhere, and can be configured in AWS settings. 
   
