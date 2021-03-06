import React, { useState } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../contexts/react-auth0-context";
import { useAuthUser } from "../contexts/AuthUserContext";
import ProfileList from "./profile/ProfileList";
import LandingPage from "./auth/Login";
import Home from "./home/Home";
import NewRollerCoaster from "./addNewForm/NewRollerCoaster";
import AddNewCreditForm from "./profile/profileCredits/NewCreditForm";
import MessageList from "./messages/general/Messages";
import EditProfile from "./profile/EditProfile";
import LeaderBoard from "./leaderBoard/LeaderBoard";
import Register from "./auth/Register";
import SelectRollerCoaster from "./profile/profileCredits/SelectRollerCoaster";
import AddPark from "./addNewForm/AddPark";
import News from "./news/News";
import BlogContributorForm from "./news/BlogContributorForm";
import Plan from "./plan/Plan";
import NewEventForm from "./plan/calendarComponents/NewEventForm";
import Forum from "./messages/Forum";
import ParkListForBulkSubmit from "./addNewForm/ParkListForBulkSubmit";
import BulkUploadForm from "./addNewForm/BulkUploadForm";
// import AuthRoute from "./AuthRoute";

const ApplicationViews = (props) => {
  const { isAuthenticated, user, loading } = useAuth0();
  const { browserData, userAgentData, platformOS, appCodeNameData, initCredentials } = props;
  const {
    authUser,
    setAuthUser,
    userProfile,
    setUserProfile,
    authToken,
    setAuthToken,
    userCredits,
    setUserCredits
  } = useAuthUser();

  const hasLoggedIn = () => sessionStorage.getItem("QuantumToken") !== null;
  const [isLoggedIn, setIsLoggedIn] = useState(hasLoggedIn());

  const setDjangoToken = (resp) => {
    sessionStorage.setItem("QuantumToken", resp.QuantumToken);
    setIsLoggedIn(hasLoggedIn());
  };


  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={(props) => {
          if (!loading && user && isAuthenticated && !isLoggedIn) {
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
                browserData={browserData}
                userAgentData={userAgentData}
                platformOS={platformOS}
                appCodeNameData={appCodeNameData}
                initCredentials={initCredentials}
                {...props}
              />
            );
          } else if (!loading && user && isAuthenticated && isLoggedIn && authUser) {
            return <LandingPage isLoggedIn={isLoggedIn} authUser={authUser} {...props} />;
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
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
                browserData={browserData}
                userAgentData={userAgentData}
                platformOS={platformOS}
                appCodeNameData={appCodeNameData}
                initCredentials={initCredentials}
                {...props}
              />
            );
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
      <Route
        exact
        path="/home"
        render={(props) => {
          if (isAuthenticated && !loading) {
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
                browserData={browserData}
                userAgentData={userAgentData}
                platformOS={platformOS}
                appCodeNameData={appCodeNameData}
                initCredentials={initCredentials}
                {...props}
              />
            );
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
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
                {...props}
              />
            );
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
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
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
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
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
      <Route
        exact
        path="/forum"
        render={(props) => {
          if (!loading && isAuthenticated && authUser.id && isLoggedIn) {
            return <Forum {...props} />;
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
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
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
      <Route
        exact
        path="/profile/:userProfileId(\d+)"
        render={(props) => {
          if (isAuthenticated && authUser.id && isLoggedIn) {
            return <EditProfile userProfileId={parseInt(props.match.params.userProfileId)} {...props} />;
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
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
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
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
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
      <Route
        exact
        path="/new/rollercoaster/parks/create"
        render={(props) => {
          if (isAuthenticated && authUser.id && isLoggedIn) {
            return <AddPark authUser={authUser} {...props} />;
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
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
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
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
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
      <Route
        exact
        path="/plan"
        render={(props) => {
          if (isAuthenticated && authUser.id && isLoggedIn) {
            return <Plan userProfile={userProfile} authUser={authUser} {...props} />;
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
      <Route
        exact
        path="/plan/calendar/event"
        render={(props) => {
          if (isAuthenticated && authUser.id && isLoggedIn) {
            return <NewEventForm userProfile={userProfile} authUser={authUser} {...props} />;
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
      <Route
        exact
        path="/parks"
        render={(props) => {
          if (isAuthenticated && authUser.id && isLoggedIn) {
            return <ParkListForBulkSubmit userProfile={userProfile} authUser={authUser} {...props} />;
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
      <Route
        exact
        path="/parks/:parkId(\d+)/bulkupload"
        render={(props) => {
          if (isAuthenticated && authUser.id && isLoggedIn) {
            return (
              <BulkUploadForm
                userProfile={userProfile}
                authUser={authUser}
                parkId={parseInt(props.match.params.parkId)}
                {...props}
              />
            );
          } else {
            return <LandingPage isLoggedIn={isLoggedIn} {...props}/>;
          }
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
