# Quantum Coasters


## Setup

* `git clone git@github.com:MattCrook/quantum-front-end-capstone.git`
#### Run with JSON Server
* `cd` into the directory it creates
   1. * Note: *the JSON Server functionality is depreciated*.
   2. To run locally using `json-server` do the following steps:
   3. `mkdir api`
   4. Cd in api directory and `touch db.json`
   5. Populate the mock database with dummy data found [here](https://gist.github.com/MattCrook/57da766ddee58d9535ebb9beb910e0c8)
   6. Install [json-server](https://www.npmjs.com/package/json-server): `npm install -g json-server`
   7. `npm install` to build dependencies
   8. `json-server -p 8200 -w api/database.json`...or I've set up a development server, so you can run `npm run dev-server` to run json-server.
   9.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Run Locally with QuantumAPI
* Or, ***preferably***, run with the **QuantumAPI**.
    1. `git clone git@github.com:MattCrook/quantum-front-end-capstone.git`
    2. `cd` into the directory it creates
    3.  Run `npm install`.
    4.  Run `npm run dev`.
    5.  To see instructions on running the API, click [here](https://github.com/MattCrook/quantumapp-api).

## Overview

This is an app for rollercoaster enthusiasts and the general public to meet in one place, look up, share, upload data, and talk to other enthusiasts. One of the main features of Quantum Coasters is to let users record their coaster “credits”, where one "credit" equals one roller coaster ridden. A key feature of this application is that if the rollercoaster does not exist in the Database, the user can create a new entry which in turn will create a new resource in the database that will allow all users to select from.
Quantum contains the following features and pages users will engage with:

### 1) Landing Page
Upon first arrival to Quantum Coasters, users will land on the below page and be prompted to sign in or register.
![LandingPage](public/ReadMePhotos/LandingPage.png)

### 2) Login/ Register
Quantum Coasters uses [Auth0](https://auth0.com/) for its authentication and authorization security services. Once validating credentials is successful, the user wll be redirected back to the Quantum site and logged in to their account. Auth0 will pass the user an access token granting them permission to access the scopes and views relative to their account, as well as be able to perform CRUD on their own resources as the backend API will be expecting the access token, as well as check the scopes and permissions of the user to authorize them to perform those actions.

![Auth0Login](public/ReadMePhotos/Auth0Login.png)

#### Added Security

![ConfirmEmailButton](public/ReadMePhotos/ConfirmEmailButton.png)

![EmailConfirmation](public/ReadMePhotos/EmailConfirmation.png)
For a returning user, they are asked to confirm their email they logged in with. This checks against Auth0, and also checks against Django Rest Auth to confirm the email entered and used to login, matches between the two auth services and matches the email attached to the session token used by Django as a unique identifier for the user.
* This step is critical for the app and added security, as it accepts the JWT token from Auth0, authenticates the user, then matches the user in the Django API side of the app so that Django is aware of the authenticsted user and can act and give permissions appropriatly.


### 3) Home
Once the user successfully authenticates, Auth0 will rediect them back to the home page of Quantum Coasters, where they will now have access to the many options to navigate to, including recording their credits!

![HomePage](public/ReadMePhotos/HomeView.png)

### 4) Profile
Navigating to the profile page, the user will see a list of credits for which they have recorded, as well as have options to add a new credit and edit their profile.
* They can choose between three different views
  * All credits
  * List of credits by Ride
  * List of credits by Park

![AllCredits](public/ReadMePhotos/AllCredits.png)

![CreditsByRide](public/ReadMePhotos/CreditsByRide.png)

![CreditsByPark](public/ReadMePhotos/CreditsByPark.png)

Once the user selects the park in which the ride is located, they are brought to a list of roller coasters in that park where they can add/ record it is a credit.

![ParkList](public/ReadMePhotos/ParksList.png)

![RideList](public/ReadMePhotos/RollerCoasterList.png)

#### Delete Profile
User has ability, if they wish, to delete their account with Quantum Coasters. Doing so will delete any and all information the user has saved within the Quantum Coasters system. 

![DeleteProfile](public/ReadMePhotos/DeleteProfile.png)

#### Edit Profile
User can edit profile info, see a total of credits to which they have, and upload a profile picture to display in other various places throughout the application.

![EditProfile](public/ReadMePhotos/EditProfile.png)

![EditProfile2](public/ReadMePhotos/EditProfile2.png)




### 5) Add New RollerCoaster
One key feature of this app is that the data provided is constantly being updated with new rides, as Quantum Coasters allows users to add to the repertoire if they cannot find the rollercoaster they are looking to record. This ensures the database is constantly being updated to include more rides from around the world.
* Once the user completes the form and it is validated, the roller coaster will then be available to select as an added credit.

![AddNewRideForm](public/ReadMePhotos/AddNewRideForm.png)

### 6) Live Leaderboard
Users can see where they rank among other coaster enthusists from around the world by navigating to the leaderboard that Quantum Coasters provides.

![Leaderboard](public/ReadMePhotos/LeaderBoard.png)


### 7) Forum 
Users can also engage with other users of the app and coaster enthusiasts alike, where they can discuss their affinity for roller coasters and share their experiences.
![Forum](public/ReadMePhotos/Forum.png)

* ***Feature in Progress:***
  * Complete overhaul of messaging section. Work in progress includes utilizing *websockets* for a live chat/ instant message system, plus ability to create chat groups, and create sub forums. 
    * The new multiple features will include the ability to invite friends, send friend requests, and overall socialize with other users on the app.
    * ![ForumWIP](public/ReadMePhotos/ForumGeneralWIP.png)


### 8) News
Custom Web Scraper pulls in the latest news from around the country and world so you as a user are always up to date on what is going on in the roller coaster world.

![News](public/ReadMePhotos/News.png)

* The user may also apply to write blog posts and have them published exclusively here on Quantum Coasters, for the community of coaster loving fans to read and interact with. This is done so with the purpose of creating a truly unique, rewarding, and educational experience reserved only for those using the Quantum Coasters app.

* ![NewsApply](public/ReadMePhotos/NewsApply.png)

### Plan
Custom calendar to plan and record events. Plan your next theme park visit, set reminders, or just this as your personal calendar to keep track of everything that you have going on!
* *Google calendar integration coming soon*.

![Plan](public/ReadMePhotos/Plan.png)

* The Quantum Calendar allows user to add events, edit events, delete events, set reminders, and will show any events scheduled in the next 5 days relative to the current day for the user in the left side bar.
* The calendar day block will show a indicator inside the block if there is an event scheduled for that day, allowing user easy navigation as to which days of the month they have an event scheduled.
* Calendar can be cycled through months in order, or filtered by years or months for easy navigation if user wishes to look back at previous months, or look into the future.

* ![AddEventModal](public/ReadMePhotos/AddEventModal.png)
* ![EditEvent](public/ReadMePhotos/EditEvent.png)


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
