# Quantum Coasters

## Setup

1. `git clone git@github.com:MattCrook/quantum-front-end-capstone.git`
1. `cd` into the directory it creates
1. `mkdir api`
1. `npm install` to build dependencies
1. `npm start` to run the app in the development mode
1. `json-server -p 8200 -w api/database.json`
1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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
* Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
