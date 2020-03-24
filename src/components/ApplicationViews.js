import { Route, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { useAuth0 } from "../contexts/react-auth0-context";
import ProfileList from "./profile/ProfileList";
import LoginLandingPage from "./auth/Login";
import Home from "./home/Home";
import NewRollerCoaster from "./addNewForm/NewRollerCoaster";
import AddNewCreditForm from "./profile/NewCreditForm";
import CreateAccount from "./auth/Register";
import EditCreditForm from "./profile/EditCreditForm";
import MessageList from "./messages/Messages";

const ApplicationViews = props => {
  console.log("props", props);
  // const [user, setUser] = useState(null);
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
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
      <Route
        exact
        path="/"
        render={props => {
          return <LoginLandingPage {...props} />;
        }}
      />

      <Route
        exact
        path="/users"
        render={props => {
          if (isAuthenticated === true) {
            return <ProfileList {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />

      <Route
        exact
        path="/users/new"
        render={props => {
          if (isAuthenticated === true) {
            return <AddNewCreditForm {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
      <Route
        exact
        path="/new/rollercoaster"
        render={props => {
          if (isAuthenticated === true) {
            return <NewRollerCoaster {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
      <Route
        exact
        path="/profile/welcome"
        render={props => {
          if (isAuthenticated === true) {
            return <CreateAccount {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
      <Route
        path="/users/:creditId(\d+)/edit"
        render={props => {
          if (isAuthenticated) {
            return (
              <EditCreditForm
                creditId={parseInt(props.match.params.creditId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/messages/:userId(\d+)"
        render={props => {
          if (isAuthenticated) {
            return (
              <MessageList
                userId={parseInt(props.match.params.userId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      {/* <Route
        exact
        path="/rollerCoasterDetails"
        render={props => {
          if (isAuthenticated === true) {
            return <AddNewRollerCoaster {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      /> */}
      {/* <Route
          exact
          path="/home"
          render={props => {
            return <Home {...props} />;
          }}
        /> */}
      {/* <Route
        exact
        path="/rollerCoasterDetails"
        render={props => {
          if (isAuthenticated === true) {
            return <AddNewRollerCoaster {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      /> */}
    </React.Fragment>
  );
};

export default ApplicationViews;
