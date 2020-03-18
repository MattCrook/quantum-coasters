import { Route, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { useAuth0 } from "../contexts/react-auth0-context";
import ProfileList from "./profile/ProfileList";
import LoginLandingPage from "./auth/Login";
import Home from "./home/Home";
import AddNewRollerCoaster from "./addNewForm/NewRollerCoaster";


const ApplicationViews = props => {
  // console.log("props", props);
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      <Route
        exact
        path="/home"
        render={props => {
          if (isAuthenticated === true) {
            return <Home {...props} />;
          } else {
            return <Redirect to="/" component={LoginLandingPage} />;
          }
        }}
      />
      {/* <Route
        exact
        path="/home"
        render={props => {
          return <Home {...props} />;
        }}
      /> */}
      <Route
        exact
        path="/"
        render={props => {
          return <LoginLandingPage {...props} />;
        }}
      />
      {/* <Route
        exact
        path="/profile"
        render={props => {
          return <ProfileList {...props} />;
        }}
      /> */}
      <Route
        exact
        path="/profile"
        render={props => {
          if (isAuthenticated === true) {
            return <ProfileList {...props} />;
          } else {
            return <Redirect to="/" component={LoginLandingPage} />;
          }
        }}
      />
      <Route
        exact
        path="/rollerCoasterDetails"
        render={props => {
          if (isAuthenticated === true) {
            return <AddNewRollerCoaster {...props} />;
          } else {
            return <Redirect to="/" component={LoginLandingPage} />;
          }
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
