# Sredzap

Sredzap is a uild a small automation app inspired by Zapier’s. You signing in
with GitHub and a Zap comments on a pull request when one is opened.

## Requirements

  - Node.js v20.10.0 installed (nvm is nice to have to manage different node versions)
  - MongoDB installed (MongoDB Compass GUI to manipulate data easier)
  - @angular/cli@17.0.10
  - ngrok (To expose your local API and being reachable by github.com )
  - git 
  - An OAuth App in github for the aplication
  

## Installation

#### NVM, node.js, and @angular/cli@17.0.10

 - Unistall previus versions of node from control panel.
 - Download and install the latest version of nvm from [NVM downloads](https://www.nvmnode.com/guide/download.html) 
 - Open a terminal and verify it is running
```
nvm version
```
 - Use the following command to install the node version that you want
```
nvm instal 20.10.0
```
 - Then this command to work with it
```
nvm use 20.10.0
```     
 - Verify the node version 
```
node --version
```
 - Then install @angular/cli@17.0.10 with 
```
npm install -g @angular/cli@17.0.10
```

#### MongoDB and Mongo Compass

 - Download MongoDB from [MongoDB Downloads](https://www.mongodb.com/try/download/community) 

![alt text](imgForMD/mongodbdownload.png)

 - In the installation process you have to select the complete option and click next until the end.

![alt text](imgForMD/mongodbcomplete.png)

 - Verify that you mark the check button for Install MongoDb Compass

![alt text](imgForMD/mongodbcompass.png)

 - Once It is finished create a database for the project

#### Clone repository

 - Open a terminal and go to your wished directory, then run the following command (verify that git is installed with `git --version` )
```
git clone https://github.com/ezequiel-flores-schmelensky/sredzap.git
```
 - once is clone you have to create .env file for the database and github credentials in the root folder of the project
```
GITHUB_CLIENT_ID=Get_it_from_github
GITHUB_CLIENT_SECRET=Get_it_from_github
MONGO_URI=mongodb://localhost:27017/example
PORT=3000
JWT_SECRET=sredzap2026
WEB_APP=http://localhost:4200
```

#### Create a new OAuth App

- Sign in on your github account, then click in your profile picture, and then settings
![alt text](imgForMD/github_settings.png)
- Look for Developer settings option, then OAuth Apps, and finally New OAuth App
![alt text](imgForMD/github_oauth.png)
- Fill up the required fields, and add a Redirect URI with the following URL, and click register app button
```
http://localhost:3000/api/auth/github/callback
```
- Then you will get your Client ID, and you have to generate a new client secret

#### Running Angular app and node server
- Running node server, Open a terminal and got to the project root folder
```
npx tsx src/app.ts
```
NOTE: tsx command is replacing ts-node because is not working with "typescript": "^7.0.2"

- Running angular server, Open a new terminal and go to your_path/sredzap/sredzap path
```
ng server
```