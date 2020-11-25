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
import AddPark from "./addNewForm/AddPark";
import News from "./news/News";
import BlogContributorForm from "./news/BlogContributorForm";

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
  userRollerCoasters,
  setUserRollerCoasters,
}) => {
  const { isAuthenticated } = useAuth0();
  const isLoggedIn = () => sessionStorage.getItem("QuantumToken") !== null;
  const [hasLoggedIn, setHasLoggedIn] = useState(isLoggedIn());

  const setDjangoToken = (resp) => {
    sessionStorage.setItem("QuantumToken", resp.QuantumToken);
    setHasLoggedIn(isLoggedIn());
  };


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
                setAuthToken={setAuthToken}
                setDjangoToken={setDjangoToken}
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
                setUserProfile={setUserProfile}
                authUser={authUser}
                setAuthUser={setAuthUser}
                setUserCredits={setUserCredits}
                userCredits={userCredits}
                userRollerCoasters={userRollerCoasters}
                setUserRollerCoasters={setUserRollerCoasters}
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
                setAuthUser={setAuthUser}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                setUserCredits={setUserCredits}
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
                authUser={authUser}
                setAuthUser={setAuthUser}
                userProfile={userProfile}
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
        path="/leaderBoard"
        render={(props) => {
          if (isAuthenticated && authUser.id && hasLoggedIn) {
            return (
              <LeaderBoard userProfile={userProfile} authUser={authUser} setUserProfile={setUserProfile} {...props} />
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
      <Route
        exact
        path="/new/rollercoaster/parks/create"
        render={(props) => {
          if (isAuthenticated && authUser.id && hasLoggedIn) {
            return (
              <AddPark
                userProfile={userProfile}
                authUser={authUser}
                setUserProfile={setUserProfile}
                userCredits={userCredits}
                setUserCredits={setUserCredits}
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
        path="/news"
        render={(props) => {
          if (isAuthenticated && authUser.id && hasLoggedIn) {
            return (
              <News
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
        path="/news/contributor/apply"
        render={(props) => {
          if (isAuthenticated && authUser.id && hasLoggedIn) {
            return (
              <BlogContributorForm
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
    </React.Fragment>
  );
};

export default ApplicationViews;
