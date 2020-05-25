# Quantum Coasters
![quantum cover](/public/Quantum.png)

## Setup

1. `git clone git@github.com:MattCrook/quantum-front-end-capstone.git`
1. `cd` into the directory it creates
2. To run locally using `json-server` do the following steps:
3. `mkdir api`
4. Cd in api directory and `touch db.json`
5. Populate the mock database with dummy data found [here](https://gist.github.com/MattCrook/57da766ddee58d9535ebb9beb910e0c8)
6. Install [json-server](https://www.npmjs.com/package/json-server): `npm install -g json-server`
7. `npm install` to build dependencies
8. `npm run dev` to run the app in the development mode
9. `json-server -p 8200 -w api/database.json`...or I've set up a development server, so you can run `npm run dev-server` to run json-server.
10. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Overview

This is an app for rollercoaster enthusiasts and the general public to meet in one place, look up, share, upload data, and talk to other enthusiasts. One of the main features of Quantum Coasters is to let users record their coaster “credits”, when they ride a roller coaster. A key feature of this application is that if the rollercoaster does not exist in the DataBase, the user can create a new entry which in turn will create a new resource in the database that will allow all users to select from.
Quantum contains the following features and pages users will engage with:
* Login
* Home
* Profile
* Leader Board
* Forum
* Adding a New Roller Coaster
* Logout

## Technologies Used
This project utilizes the following:
* Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)


* Auth0
* Context API
* React Router DOM
* React Router
* React Testing Library
* Jest
* Zeit
* Github Actions
* React Confirm Alert
* Cloudinary
* Material UI
* Webpack
* Bulma
* DbDiagram


## Skills Utilized
The skills and concepts utilized to complete this project included the following:

1. React: hooks, state, props, routes
2. API calls with: POST, PUT, PATCH, DELETE, and GET (with expand, embed)
3. Javascript: functions, objects, arrays, mapping
4. Persistent data storage with JSON Server
5. Github Scrum workflow
6. CSS styling
7. Modular code
8. Semantic HTML
9. Testing with Jest/ React Testing Library
10. Using and integrating with 3rd party service for Authentication
11. Pure functional components
12. Flow and state management through the React Context API
13. Building A CI/ CD pipeline
14. Github actions for auto deploys to zeit, running  tests, linting, prettier
15. Using conventional commit logs

## Database Diagram
![quantum database](./QuantumCoastersERD.png)

## Deployed Application Link
[Quantum Coasters](https://quantum-application-71iyalov8.now.sh/)
