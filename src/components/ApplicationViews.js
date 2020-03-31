import { Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ApiManager from "../modules/ApiManager";
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

const ApplicationViews = ({ userProfile, setUserProfile }) => {
  const { isAuthenticated } = useAuth0();
  // const [userProfile, setUserProfile] = useState({});
  // const userProfile = props.userProfile;
  // const setUserProfile = props.setUserProfile
  // console.log("app View props", { props });
  console.log("app view", { userProfile });
  // const { userProfile, }

  // useEffect(() => {
  //   if (userProfile) {
  //     setUserProfile(userProfile);
  //   } else {
  //     setUserProfile({});
  //   }
  // }, [userProfile, setUserProfile]);

  return (
    <React.Fragment>
      <Route
        exact
        path="/home"
        render={props => {
          console.log("** userProfileFromState", userProfile);
          if (isAuthenticated === true) {
            return (
              <Home
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                {...props}
              />
            );
          } else {
            return <Redirect to="/" />;
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
          if (isAuthenticated === true && userProfile.id) {
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
          if (isAuthenticated === true && userProfile.id) {
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
          if (isAuthenticated === true && userProfile.id) {
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
            return (
              <CreateAccount
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                {...props}
              />
            );
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
      <Route
        path="/users/:creditId(\d+)/edit"
        render={props => {
          if (isAuthenticated === true && userProfile.id) {
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
          if (isAuthenticated === true && userProfile.id) {
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
          if (isAuthenticated === true && userProfile.id) {
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
          if (isAuthenticated === true && userProfile.id) {
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
