import { Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "../contexts/react-auth0-context";
import ProfileList from "./profile/ProfileList";
import LoginLandingPage from "./auth/Login";
import Home from "./home/Home";
import NewRollerCoaster from "./addNewForm/NewRollerCoaster";
import AddNewCreditForm from "./profile/NewCreditForm";
import CreateAccount from "./auth/Register";
import EditCreditForm from "./profile/EditCreditForm";
import MessageList from "./messages/Messages";
import EditProfile from "./profile/EditProfile";
import LeaderBoard from "./leaderBoard/LeaderBoard";

const ApplicationViews = props => {
  const { user, isAuthenticated } = useAuth0();
  const userProfileFromState = props.userProfile;
  console.log("app view", { user });
  const [userProfile, setUserProfile] = useState({});
  console.log("userProfile", userProfile)
  console.log("userProfileFromState", userProfileFromState)

  useEffect(() => {
    if (userProfileFromState) {
      setUserProfile(userProfileFromState);
    } else {
      setUserProfile({});
    }
  }, [userProfileFromState]);

  return (
    <React.Fragment>
      <Route
        exact
        path="/home"
        render={props => {
          if (isAuthenticated === true) {
            return <Home userProfile={userProfile} {...props} />;
          } else {
            return <Redirect to="/home" component={Home} />;
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
          if ((isAuthenticated === true) && (userProfile.id)) {
            return <ProfileList {...props} />;
          } else {
            return <Redirect to="/" component={LoginLandingPage} />;
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
                rollerCoasterId={parseInt(props.match.params.rollerCoasterId)}
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
        path="/messages"
        render={props => {
          if (isAuthenticated) {
            return <MessageList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/profile/:userProfileId(\d+)"
        render={props => {
          if (isAuthenticated) {
            return (
              <EditProfile
                userProfileId={parseInt(props.match.params.userProfileId)}
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
        path="/leaderBoard"
        render={props => {
          if (isAuthenticated) {
            return <LeaderBoard {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
