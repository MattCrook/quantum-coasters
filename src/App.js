import React, { useState, useEffect } from "react";
import { useAuth0 } from "./contexts/react-auth0-context";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import userManager from "./modules/users/userManager";
import "./App.css";
import "bulma/css/bulma.css";
import CssBaseline from "@material-ui/core/CssBaseline";


const App = (props) => {
  const { loading, user, getIdTokenClaims, getTokenSilently, isAuthenticated, appInitOptions } = useAuth0();
  const [userProfile, setUserProfile] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const [userCredits, setUserCredits] = useState([]);
  const [authToken, setAuthToken] = useState([]);
  const [userRollerCoasters, setUserRollerCoasters] = useState([]);
  const [initOptions, setInitOptions] = useState([]);


  // This function will fire upon login and sets/ posts the init options and credentials for the user at /credentials endpoint.
  const updateInitOptions = (initAuth0Options) => {
    console.log(appInitOptions)
    if (initAuth0Options.length > 0) {
      userManager
        .postInitAppOptions(initAuth0Options[0])
        .then((resp) => {
          setInitOptions(resp);
        })
        .catch((err) => console.log({ err }));
    }
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      const userEmail = user.email;
      sessionStorage.setItem("credentials", JSON.stringify(userEmail));
      const guardForUserProfile = async (userEmail) => {
        const tokenId = await getIdTokenClaims();
        const accessToken = await getTokenSilently();

        if (tokenId && accessToken) {
          sessionStorage.setItem("IdToken", JSON.stringify(tokenId));
          sessionStorage.setItem("accessToken", accessToken);
        }
        const getAuthUser = await userManager.getAuthUser(userEmail);

        if (getAuthUser.length > 0) {
          const authUserId = getAuthUser[0].id;
          const getProfile = await userManager.getUserProfileEmbeddedAuthUser(authUserId);
          const creditsArray = getProfile[0].credits;

          setAuthUser(getAuthUser[0]);
          setUserProfile(getProfile[0]);
          setUserCredits(creditsArray);

          const djangoAuthToken = sessionStorage.getItem("QuantumToken");
          setAuthToken(djangoAuthToken);

          if (appInitOptions.length > 0) {
            const sessionId = sessionStorage.getItem("sessionId");
            const csrf = getCookie("csrftoken");
            let authInitOptions = appInitOptions[0];

            if (csrf) {
              authInitOptions["csrf_token"] = csrf
            }
            if (sessionId) {
              authInitOptions["session_id"] = sessionId;
            }
            updateInitOptions([authInitOptions]);
          }
        } else {
          console.log("Please Complete your Profile. :) ");
          setUserProfile([]);
        }
      };
      guardForUserProfile(userEmail);
    }
  }, [user, getIdTokenClaims, getTokenSilently, isAuthenticated, appInitOptions]);



  if (loading) {
    return (
      <div className="loading_container">
        <div className="loading_pop_up">Loading...</div>
        <div className="spinner icon-spinner-2" aria-hidden="true"></div>
      </div>
    );
  }



  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
        console.log("c", cookie);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }



  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <NavBar
          userProfile={userProfile}
          authUser={authUser}
          setUserProfile={setUserProfile}
          setAuthUser={setAuthUser}
          authToken={authToken}
          {...props}
        />
        <ApplicationViews
          userProfile={userProfile}
          authUser={authUser}
          setUserProfile={setUserProfile}
          setAuthUser={setAuthUser}
          userCredits={userCredits}
          setUserCredits={setUserCredits}
          authToken={authToken}
          setAuthToken={setAuthToken}
          userRollerCoasters={userRollerCoasters}
          setUserRollerCoasters={setUserRollerCoasters}
          initOptions={initOptions}
          {...props}
        />
      </BrowserRouter>
    </>
  );
};
export default App;
