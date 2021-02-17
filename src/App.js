import React, { useState, useEffect } from "react";
import { useAuth0 } from "./contexts/react-auth0-context";
import { useAuthUser } from "./contexts/AuthUserContext";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
// import userManager from "./modules/users/userManager";
import { parseUserAgent } from "./modules/Helpers";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ErrorLogProvider } from "./contexts/ErrorLogContext";
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
  const hasQuantumToken = sessionStorage.getItem("QuantumToken") !== null;


  useEffect(() => {
    if (user && isAuthenticated && appInitOptions && appInitOptions.length > 0) {
      const init = async () => {
        const sessionId = sessionStorage.getItem("sessionId");
        const csrf_token = getCookie("csrftoken");
        const allCookies = getallCookies();
        let authInitOptions = appInitOptions[0];

        if (csrf_token) {
          authInitOptions["csrf_token"] = csrf_token;
        }

        if (sessionId) {
          authInitOptions["session_id"] = sessionId;
        }

        if (allCookies && allCookies.length > 0) {
          authInitOptions['cookies'] = allCookies[0];
        }

        if (hasQuantumToken) {
          console.log("App.js: hasQuantumToken");
        }
        setInitOptions(authInitOptions)
        parseUserAgent(userAgent, setBrowserData, setUserAgentData);
        setPlatformOS(platformOperatingSystem);
        setAppCodeNameData(appCodeName);
      };
      init();
    }
  }, [appCodeName, appInitOptions, hasQuantumToken, isAuthenticated, platformOperatingSystem, user, userAgent]);


  if (loading) {
    return (
      <div className="loading fade_in">
        <div className="loading-text">
          <span className="loading-text-words">L</span>
          <span className="loading-text-words">O</span>
          <span className="loading-text-words">A</span>
          <span className="loading-text-words">D</span>
          <span className="loading-text-words">I</span>
          <span className="loading-text-words">N</span>
          <span className="loading-text-words">G</span>
        </div>
      </div>
    )
  }


  function getallCookies() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");
    console.log("App.js - cookieArray", cookieArray);
    let cookiesInSession = [];
    let otherCookies = [];
    let allCookies = {};
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      const isCsrf = cookie.charAt(0) === "c" && cookie.charAt(1) === "s" && cookie.charAt(2) === "r" && cookie.charAt(3) === "f";
      const isCrisp = cookie.charAt(0) === " " && cookie.charAt(1) === "c" && cookie.charAt(2) === "r" && cookie.charAt(3) === "i";
      if (!isCsrf && !isCrisp) {
        while (cookie.charAt(0) === " ") {
          cookie = cookie.substring(1);
          otherCookies.push(cookie);
        }
      }
      if (isCsrf) {
        const quantumCsrfCookie = cookie.split("=")[1];
        allCookies["csrf_token"] = quantumCsrfCookie;
      }
      if (isCrisp) {
        const auth0SessionCookie = cookie.split("=")[1];
        allCookies["auth0_session_cookie"] = auth0SessionCookie
      }
    }
    allCookies["other"] = otherCookies;
    cookiesInSession.push(allCookies);
    return cookiesInSession;
  }

  function getCookie(cookieName) {
    let name = cookieName + "=";
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
