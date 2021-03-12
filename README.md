# Quantum Coasters


## Setup

* `git clone git@github.com:MattCrook/quantum-front-end-capstone.git`
#### Run with JSON Server
* `cd` into the directory it creates
   1. * Note: *the JSON Server functionality is depreciated*.
         1. To run locally using `json-server` do the following steps:
         2. `mkdir api`
         3. Cd in api directory and `touch db.json`
         4. Populate the mock database with dummy data found [here](https://gist.github.com/MattCrook/57da766ddee58d9535ebb9beb910e0c8)
         5. Install [json-server](https://www.npmjs.com/package/json-server): `npm install -g json-server`
         6. `npm install` to build dependencies
         7. `json-server -p 8200 -w api/database.json`...or I've set up a development server, so you can run `npm run dev-server` to run json-server.
         8.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Run Locally with the backend QuantumApp
* Or, ***preferably***, run with the **QuantumAPI/ QuantumApp**.
    1. `git clone git@github.com:MattCrook/quantum-front-end-capstone.git`
    2. `cd` into the directory it creates
    3.  Run `npm install`.
    4.  Run `npm run dev`.
    5.  To see instructions on cloning and running the Backend, click **[here](https://github.com/MattCrook/quantumapp-api)**.

## Overview

Quantum Coasters application for rollercoaster enthusiasts and the general public to meet in one place, look up, share, upload data, talk to other enthusiasts, learn the latest news in the amusement industry world, plan their theme park trips and vacations using Quantum's custom calendar, and most importantly track and record their coaster "credits", where one "credit" equals one roller coaster ridden. A key feature of this application is that it encourages a crowd sourced engagement to keep the repertoire of rides and rollercoasters always growing and up to date. If the rollercoaster does not exist to choose from to record a credit, the user can request to create a new entry, and wth the correct access and credentials can create and add to the repertoire of Quantum Coasters, which in turn will create a new resource in the database that will allow all users to select from.

Quantum Coasters has a Service Oriented Architecture, comprised of many separated applications that encapsulate their key functionality.

![LandingPage](public/ReadMePhotos/LandingPage.png)

As a whole, Quantum Coasters includes:
* **Quantum Coasters main client**.
  * React client completely decoupled as it's own stand alone app.
    * This is the main application users will interact with, authenticate with, and be using the majority of the time.
* **Auth0 Authentication and Management Server**
  * Third party authentication service in which all tenants under Quantum Coasters are connected.
  * Once user authenticates through he React client, they become a federated user and all tenants under Quantum Coasters know about the user, giving the user a smooth SSO experience.
* **QuantumAPI**
  * RESTful API to which the other micro services can talk to, to send or receive data from the database.
    * Makes heavy use of serialization / de-serialization, as well as a great extent a validation for data integrity for both writes to the database, and returning data to a client. 
* **Quantum Machine to Machine API**
  * API that sits between the QuantumAPI, and the Authentication and Management Server.
* **Quantum Forum**
  * Social / Chat application allowing users to communicate with other users of Quantum Coasters.
    * The Quantum Forum includes the abilities to:
      * Post in a general forum that is open to the public and anyone (using the app) can post.
      * Create a group chat/channel by adding friends of other Quantum users.
      * Create a private chat/ DM to talk to a single friend or another Quantum user.
* **Quantum Admin**
  * Administrative and Management application for System Administrators to view key metrics about the app, perform actions that require privileged rights, credentials, and scopes, and analyze the various services and components provided by the custom tooling that the Quantum Admin offers.


To see a more detailed breakdown of each Micro Service, as well as it's functionalities more in depth, click the application for which you want to view below:

1. [Quantum Coasters (main client)](public/docs/QuantumCoasters.md)
2. [Authentication](public/docs/Authentication.md)
3. [Quantum Forum](public/docs/Forum.md)
4. [Quantum Admin](public/docs/QuantumAdmin.md)


## Technologies Used
This project utilizes the following:
* React
* React Context API
* React Router DOM
* React Router
* React Confirm Alert
* Auth0
* JWT and session auth for Authentication
* PostgreSQL
* React Testing Library
* Jest
* Deployed with Zeit/Now/Vercel
* Github Actions
* Material UI
* Semantic UI
* Webpack
* DbDiagram
* date-fns
* Vercel
* Python
* Django


## Skills Utilized
The skills and concepts utilized to complete this project included the following:

1. React: hooks, state, props, routes
2. API calls with: POST, PUT, PATCH, DELETE, and GET (with expand, embed)
3. Javascript: functions, objects, arrays, mapping
5. Github Scrum workflow
6. CSS styling
7. Modular code
8. Semantic HTML
9. Testing with Jest/ React Testing Library
10. Using and integrating with 3rd party service for Authentication
11. Pure functional components
12. Flow and state management through the React Context API
13. Building A CI/ CD pipeline
14. Github actions for auto deploys to Vercel, running  tests, linting, prettier
15. Using conventional commit logs

<!-- ## Database Diagram
![quantum database](./QuantumCoastersERD.png) -->

## Deployed Application Link
[Quantum Coasters](https://quantum-application-71iyalov8.now.sh/)
