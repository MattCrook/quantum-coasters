import React, { useState, useEffect } from "react";
import { useAuth0 } from "./contexts/react-auth0-context";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import history from "./utils/history";
import ApiManager from "./modules/ApiManager";
import "./App.css";
import "bulma/css/bulma.css";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  const { loading, user } = useAuth0();
  const [userProfile, setUserProfile] = useState({});


  useEffect(() => {
    const isProfileCompleted = async user => {
      if (user) {
        ApiManager.getUserProfile(user.email)
          .then(userProfileFromAPI => {
            sessionStorage.setItem("credentials", JSON.stringify(user.email));
            if (userProfileFromAPI.length > 0) {
              setUserProfile(userProfileFromAPI[0]);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("DONT HAVE USER YET.");
        setUserProfile({});
      }
    };
    isProfileCompleted(user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <CssBaseline />
      <Router history={history}>
        <NavBar userProfile={userProfile} setUserProfile={setUserProfile} />
        <ApplicationViews userProfile={userProfile} setUserProfile={setUserProfile}
        />
      </Router>
    </>
  );
};
export default App;
