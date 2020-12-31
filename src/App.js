import React, { useState, useEffect } from "react";
import { useAuth0 } from "./contexts/react-auth0-context";
import { useAuthUser } from "./contexts/AuthUserContext";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import userManager from "./modules/users/userManager";
import { parseUserAgent } from "./modules/Helpers";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ErrorLogProvider} from "./contexts/ErrorLogContext"
import "./App.css";
import "bulma/css/bulma.css";


const App = (props) => {
  const { loading, user, isAuthenticated, appInitOptions } = useAuth0();
  const { authUser, userProfile, authToken } = useAuthUser();
  const [initOptions, setInitOptions] = useState([]);
  const [browserData, setBrowserData] = useState();
  const [userAgentData, setUserAgentData] = useState();
  const [platformOS, setPlatformOS] = useState();
  const [appCodeNameData, setAppCodeNameData] = useState();
  const { userAgent } = navigator;
  const appCodeName = navigator.appCodeName;
  const platformOperatingSystem = navigator.platform;
  const hasCredentials = sessionStorage.getItem("QuantumToken") !== null;


  useEffect(() => {
    if (user && isAuthenticated && appInitOptions && appInitOptions.length > 0) {
      const init = async () => {
        const sessionId = sessionStorage.getItem("sessionId");
        const csrf_token = getCookie("csrftoken");
        let authInitOptions = appInitOptions[0];

        if (csrf_token) {
          authInitOptions["csrf_token"] = csrf_token;
        }

        if (sessionId) {
          authInitOptions["session_id"] = sessionId;
        }

        if (hasCredentials) {
          const updateAuthInitCredentials = await userManager.postInitAppOptions(authInitOptions);
          setInitOptions(updateAuthInitCredentials);
        }

        parseUserAgent(userAgent, setBrowserData, setUserAgentData);
        setPlatformOS(platformOperatingSystem);
        setAppCodeNameData(appCodeName);
      };
      init();
    }
  }, [appCodeName, appInitOptions, hasCredentials, isAuthenticated, platformOperatingSystem, user, userAgent]);

  if (loading) {
    return (
      <div className="loading_container">
        <div className="loading_pop_up">Loading...</div>
        <div className="spinner icon-spinner-2" aria-hidden="true"></div>
      </div>
    );
  }

  function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
        console.log(cookie);
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
        <ErrorLogProvider>
        <NavBar userProfile={userProfile} authUser={authUser} authToken={authToken} {...props} />
        <ApplicationViews
          initOptions={initOptions}
          browserData={browserData}
          userAgentData={userAgentData}
          platformOS={platformOS}
          appCodeNameData={appCodeNameData}
          {...props}
        />
        </ErrorLogProvider>
      </BrowserRouter>
    </>
  );
};
export default App;
