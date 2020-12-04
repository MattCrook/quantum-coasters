import { Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import { postLoginInfo } from "../modules/services/services";
// import {parseUserAgent} from "../modules/Helpers";
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
  browserData,
  userAgentData,
  platformOS,
  appCodeNameData,
}) => {
  const { isAuthenticated } = useAuth0();
  const hasLoggedIn = () => sessionStorage.getItem("QuantumToken") !== null;
  const [isLoggedIn, setIsLoggedIn] = useState(hasLoggedIn());

  const setDjangoToken = (resp) => {
    sessionStorage.setItem("QuantumToken", resp.QuantumToken);
    setIsLoggedIn(hasLoggedIn());
  };

  const sendLoginInfo = async (data) => {
    try {
      await postLoginInfo(data);
    } catch (err) {
      console.log({ "Error sending Login Info": err });
    }
  };

  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={(props) => {
          return <LandingPage isLoggedIn={isLoggedIn} {...props} />;
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
                setIsLoggedIn={setIsLoggedIn}
                setDjangoToken={setDjangoToken}
                setAuthToken={setAuthToken}
                sendLoginInfo={sendLoginInfo}
                browserData={browserData}
                userAgentData={userAgentData}
                platformOS={platformOS}
                appCodeNameData={appCodeNameData}
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
                setAuthUser={setAuthUser}
                authToken={authToken}
                setAuthToken={setAuthToken}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                hasLoggedIn={hasLoggedIn}
                setDjangoToken={setDjangoToken}
                sendLoginInfo={sendLoginInfo}
                browserData={browserData}
                userAgentData={userAgentData}
                platformOS={platformOS}
                appCodeNameData={appCodeNameData}
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
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
          if (isAuthenticated && authUser.id && isLoggedIn) {
            return <News userProfile={userProfile} authUser={authUser} {...props} />;
          } else {
            return <LandingPage />;
          }
        }}
      />
      <Route
        exact
        path="/news/contributor/apply"
        render={(props) => {
          if (isAuthenticated && authUser.id && isLoggedIn) {
            return <BlogContributorForm userProfile={userProfile} authUser={authUser} {...props} />;
          } else {
            return <LandingPage />;
          }
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
