import { Route } from "react-router-dom";
import React from "react";
import { useAuth0 } from "../contexts/react-auth0-context";
import ProfileList from "./profile/ProfileList";
import LandingPage from "./auth/Login";
import Home from "./home/Home";
import NewRollerCoaster from "./addNewForm/NewRollerCoaster";
import AddNewCreditForm from "./profile/NewCreditForm";
// import CreateAccount from "./auth/Register";
import MessageList from "./messages/Messages";
import EditProfile from "./profile/EditProfile";
import LeaderBoard from "./leaderBoard/LeaderBoard";
import Register from "./auth/Register";
import SelectRollerCoaster from "./profile/SelectRollerCoaster"
// import AuthRoute from "./AuthRoute";

const ApplicationViews = ({
  userProfile,
  setUserProfile,
  authUser,
  setAuthUser,
}) => {
  const { isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={(props) => {
          return <LandingPage {...props} />;
        }}
      />
      <Route
        exact
        // path="/profile/welcome"
        path="/register"
        render={(props) => {
          if (isAuthenticated === true) {
            return (
              <Register
                userProfile={userProfile}
                authUser={authUser}
                setUserProfile={setUserProfile}
                setAuthUser={setAuthUser}
                {...props}
              />
            );
          } else {
            return <LandingPage />;
          }
        }}
      />
      <Route
        exact
        path="/home"
        render={(props) => {
          if (isAuthenticated === true) {
            return (
              <Home
                userProfile={userProfile}
                authUser={authUser}
                setUserProfile={setUserProfile}
                setAuthUser={setAuthUser}
                {...props}
              />
            );
          } else {
            return <LandingPage />;
          }
        }}
      />

      <Route
        exact
        path="/users"
        render={(props) => {
          if (isAuthenticated === true && userProfile.id) {
            return <ProfileList  userProfile={userProfile} authUser={authUser} {...props} />;
          } else {
            return <LandingPage />;
          }
        }}
      />

      <Route
        exact
        path="/users/new"
        render={(props) => {
          if (isAuthenticated === true && userProfile.id) {
            return <AddNewCreditForm authUser={authUser} userProfile={userProfile}{...props} />;
          } else {
            return <LandingPage />;
          }
        }}
      />
      <Route
        exact
        path="/new/rollercoaster"
        render={(props) => {
          if (isAuthenticated === true && userProfile.id) {
            return <NewRollerCoaster {...props} />;
          } else {
            return <LandingPage />;
          }
        }}
      />
      <Route
        exact
        path="/messages"
        render={(props) => {
          if (isAuthenticated === true && userProfile.id) {
            return <MessageList {...props} />;
          } else {
            return <LandingPage />;
          }
        }}
      />
      <Route
        exact
        path="/profile/:userProfileId(\d+)"
        render={(props) => {
          if (isAuthenticated === true && userProfile.id) {
            return (
              <EditProfile
                userProfileId={parseInt(props.match.params.userProfileId)}
                {...props}
              />
            );
          } else {
            return <LandingPage />;
          }
        }}
      />
      <Route
        exact
        path="/leaderBoard"
        render={(props) => {
          if (isAuthenticated === true && userProfile.id) {
            return (
              <LeaderBoard
                userProfile={userProfile}
                authUser={authUser}
                {...props}
              />
            );
          } else {
            return <LandingPage />;
          }
        }}
      />
      <Route
        exact
        path="/rollerCoasters/park/:parkId(\d+)"
        render={(props) => {
          if (isAuthenticated === true && userProfile.id) {
            return (
              <SelectRollerCoaster
                userProfile={userProfile}
                authUser={authUser}
                parkId={parseInt(props.match.params.parkId)}
                {...props}
              />
            );
          } else {
            return <LandingPage />;
          }
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
