import { Route } from "react-router-dom";
import React, { useState } from "react";
import { useAuth0 } from "../contexts/react-auth0-context";
import ProfileList from "./profile/ProfileList";
import LandingPage from "./auth/Login";
import Home from "./home/Home";
import NewRollerCoaster from "./addNewForm/NewRollerCoaster";
import AddNewCreditForm from "./profile/NewCreditForm";
import MessageList from "./messages/Messages";
import EditProfile from "./profile/EditProfile";
import LeaderBoard from "./leaderBoard/LeaderBoard";
import Register from "./auth/Register";
import SelectRollerCoaster from "./profile/SelectRollerCoaster";
// import AuthRoute from "./AuthRoute";

const ApplicationViews = ({
  userProfile,
  setUserProfile,
  authUser,
  setAuthUser,
  userCredits,
  setUserCredits,
  authToken,
  setAuthToken,
}) => {
  const { isAuthenticated } = useAuth0();
  const isLoggedIn = () => sessionStorage.getItem("QuantumToken") !== null;
  const [hasLoggedIn, setHasLoggedIn] = useState(isLoggedIn());

  const setDjangoToken = (resp) => {
    sessionStorage.setItem("QuantumToken", resp.QuantumToken);
    setHasLoggedIn(isLoggedIn());
  };

  console.log(isLoggedIn());
  console.log(authUser);
  console.log(userProfile);

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
        path="/register"
        render={(props) => {
          if (isAuthenticated) {
            return (
              <Register
                userProfile={userProfile}
                authUser={authUser}
                setUserProfile={setUserProfile}
                setAuthUser={setAuthUser}
                setHasLoggedIn={setHasLoggedIn}
                setDjangoToken={setDjangoToken}
                setAuthToken={setAuthToken}
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
          if (isAuthenticated) {
            return (
              <Home
                userProfile={userProfile}
                authUser={authUser}
                setUserProfile={setUserProfile}
                setAuthUser={setAuthUser}
                authToken={authToken}
                hasLoggedIn={hasLoggedIn}
                setHasLoggedIn={setAuthToken}
                setAuthToken={setAuthToken}
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
        path="/user/profile/credits"
        render={(props) => {
          if (isAuthenticated && authUser.id && hasLoggedIn) {
            return (
              <ProfileList
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
        path="/user/parks/addcredit"
        render={(props) => {
          if (isAuthenticated && authUser.id && hasLoggedIn) {
            return (
              <AddNewCreditForm
                authUser={authUser}
                userProfile={userProfile}
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
        path="/new/rollercoaster"
        render={(props) => {
          if (isAuthenticated && authUser.id && hasLoggedIn) {
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
          if (isAuthenticated && authUser.id && hasLoggedIn) {
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
          if (isAuthenticated && authUser.id && hasLoggedIn) {
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
          if (isAuthenticated && authUser.id && hasLoggedIn) {
            return (
              <LeaderBoard
                userProfile={userProfile}
                authUser={authUser}
                setUserProfile={setUserProfile}
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
          if (isAuthenticated && authUser.id && hasLoggedIn) {
            return (
              <SelectRollerCoaster
                userProfile={userProfile}
                authUser={authUser}
                setUserProfile={setUserProfile}
                userCredits={userCredits}
                setUserCredits={setUserCredits}
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
