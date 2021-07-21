# Scouter-FrontEnd
This is the Backend repository. Finish the **Getting Started** section before installing the [Frontend](https://github.com/j-m-smith426/Team-4-Project-1-FrontEnd).

## Project Description
Scouter is a social web application designed to be a community for anime viewers. The backend repository handles the HTTP requests to the database, allowing for the frontend to retrieve the required information for a user, an anime, and a post. Scouter's routing follows DAO design pattern and employs a variety of middleware including Morgan and Helmet that execute during the Express request.

Code Coverage: 80.6% Lines

## Technologies and Languages Used
* NodeJS - 16.3.0
* AWS V3 - DynamoDB
* Express - ^4.17.1
* TypeScript - ^4.3.4

## Features

List of features ready and TODOs for future development
* GET and POST requests for an Anime
* GET and POST requests for a Post
* GET and POST requests for a User
* We've written functioning routes for adding followers for a future implementation in the frontend

To-do list:
We've written full CRUD operations for our entities but PUT and DELETE requests are commented out because we didn't want to give a user full access.
* Enabling full CRUD for an Admin account
* Refactoring/Cleaning up code
* More comprehensive testing

## Getting Started
To clone the repository, run the following command in your terminal:
```powershell
git clone https://github.com/j-m-smith426/Team-4-Project-1.git
```
Alternatively, if you have Github Desktop, you can click on 'Code' and 'Open with Github Desktop'.
Be sure [NodeJS](https://nodejs.org/en/download/) is installed as well as a text editor. We recommend [Visual Studio Code](https://code.visualstudio.com/download).

To check if NodeJS and Node Package Manager installed correctly, run the following command:
```powershell
node --version
npm --version
```
Both should result in a version display.
Once installed, open up the root of the repository and install Scouter's dependencies: 
```powershell
npm install
```
This will read from the package.json and install all necessary dependencies, including React and TypeScript. At this point, the backend should be ready.

Now, you are ready to run the application. Open up the backend and run:
```powershell
npm run start:dev
```
In the future, when you have set up the frontend and are running the application, you will the requests being made in the console of the backend.

Use `Ctrl+C` to stop the server. Now, proceed to the [Scouter's Frontend](https://github.com/j-m-smith426/Team-4-Project-1-FrontEnd).

## Usage
The backend is used server-side. It is meant for communication with the frontend. The user will not need to do any more than running the backend to handle requests on the frontend.

## Contributors
Scouter Developers:
* Joab Smith 
* Nick Wang 
* Matthew Hanrahan 
* Imran Ilyas

## License

This project uses the following license: [<license_name>](<link>).
