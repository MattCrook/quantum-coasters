import React, { useState, useEffect } from "react";
import { useAuth0 } from "./contexts/react-auth0-context";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import history from "./utils/history";
import userManager from "./modules/users/userManager";
import "./App.css";
import "bulma/css/bulma.css";
import CssBaseline from "@material-ui/core/CssBaseline";
// import accessToken from "./utils/reducers/authReducers";

const App = (props) => {
  const { loading, user, getIdTokenClaims } = useAuth0();
  const [userProfile, setUserProfile] = useState([]);
  const [authUser, setAuthUser] = useState([]);

  useEffect(() => {
    if (!loading && user) {
      const userEmail = user.email;
      const guardForUserProfile = async (userEmail) => {
        const token = await getIdTokenClaims()
        console.log({ token })
        if (token) {
          localStorage.setItem("accessToken", JSON.stringify(token.__raw));
        }
        const getAuthUser = await userManager.getAuthUser(userEmail);
        if (getAuthUser.length > 0) {
          const authUserId = getAuthUser[0].id;
          const getProfile = await userManager.getUserProfileEmbeddedAuthUser(authUserId);
          sessionStorage.setItem("credentials", JSON.stringify(userEmail));
          setAuthUser(getAuthUser[0]);
          setUserProfile(getProfile[0]);
        } else {
          console.log("Please Complete your Profile. :) ");
          setUserProfile([]);
        }
      };
      guardForUserProfile(userEmail);

    }
  }, [user, getIdTokenClaims]);

  if (loading) {
    return <div className="loading_pop_up">Loading...</div>;
  }

  return (
    <>
      <CssBaseline />
      <Router history={history}>
        <NavBar
          userProfile={userProfile}
          authUser={authUser}
          setUserProfile={setUserProfile}
          setAuthUser={setAuthUser}
          {...props}
        />
        <ApplicationViews
          userProfile={userProfile}
          authUser={authUser}
          setUserProfile={setUserProfile}
          setAuthUser={setAuthUser}
          {...props}
        />
      </Router>
    </>
  );
};
export default App;




// fetching the userProfile (when i was using json server) to check if there is one. Will determine conditional rendering
// further down in app. If there is no user profile, the rest of the app is blocked or hidden so user has to fill out
// complete profile form.

// user is auth0 user
// userEmail is auth0 user email
// getting token for auth0 user coming back from auth0
// getUSerProfile takes email from auth0, searches my database for that email
// sets the access token from auth0 in local storage for that user and user profile
// userProfile is an array
// if there is a profile (length > 0) means they have completed the profile form and have a profile in my databse
// if not, means they have to complete profile, should see banner for form
// thier token (password), email should follow them and they complete thier profile
// thus making a POST to my database tying the user, userProfile, and Auth0 user together.
