import React, { useState, useEffect } from "react";
import { useAuth0 } from "./contexts/react-auth0-context";
import { useAuthUser } from "./contexts/AuthUserContext";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import userManager from "./modules/users/userManager";
import { parseUserAgent } from "./modules/Helpers";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import "bulma/css/bulma.css";

const App = (props) => {
  const { loading, user, isAuthenticated, appInitOptions } = useAuth0();
  const { authUser, userProfile, userCredits, authToken, setUserProfile} = useAuthUser();
  // const [userProfile, setUserProfile] = useState([]);
  // const [authUser, setAuthUser] = useState([]);
  // const [userCredits, setUserCredits] = useState([]);
  // const [authToken, setAuthToken] = useState([]);
  // const [userRollerCoasters, setUserRollerCoasters] = useState([]);
  const [initOptions, setInitOptions] = useState([]);
  const [browserData, setBrowserData] = useState({});
  const [userAgentData, setUserAgentData] = useState({});
  const [platformOS, setPlatformOS] = useState({});
  const [appCodeNameData, setAppCodeNameData] = useState({});
  const { userAgent } = navigator;
  const appCodeName = navigator.appCodeName;
  const platformOperatingSystem = navigator.platform;

  const parseUserAgentDataHelper = (userAgent, setBrowserData, setUserAgentData) => {
    parseUserAgent(userAgent, setBrowserData, setUserAgentData);
  };

  useEffect(() => {
    if (user && isAuthenticated && authUser.length > 0 && appInitOptions.length > 0) {
      const init = async () => {
        const sessionId = sessionStorage.getItem("sessionId");
        const csrf = getCookie("csrftoken");
        let authInitOptions = appInitOptions[0];

        if (csrf) {
          authInitOptions["csrf_token"] = csrf;
        }
        if (sessionId) {
          authInitOptions["session_id"] = sessionId;
        }

        const updateAuthInitCredentials = await userManager.postInitAppOptions(authInitOptions);
        setInitOptions(updateAuthInitCredentials);
        parseUserAgentDataHelper(userAgent, setBrowserData, setUserAgentData);
        setPlatformOS(platformOperatingSystem);
        setAppCodeNameData(appCodeName);
      };
      init();
    } else {
      console.log("Please Complete your Profile. :) ");
      setUserProfile([]);
    }
  }, []);

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
          // setAuthUser={setAuthUser}
          authToken={authToken}
          {...props}
        />
        <ApplicationViews
          userProfile={userProfile}
          authUser={authUser}
          setUserProfile={setUserProfile}
          // setAuthUser={setAuthUser}
          userCredits={userCredits}
          // setUserCredits={setUserCredits}
          authToken={authToken}
          // setAuthToken={setAuthToken}
          // userRollerCoasters={userRollerCoasters}
          // setUserRollerCoasters={setUserRollerCoasters}
          initOptions={initOptions}
          browserData={browserData}
          userAgentData={userAgentData}
          platformOS={platformOS}
          appCodeNameData={appCodeNameData}
          {...props}
        />
      </BrowserRouter>
    </>
  );
};
export default App;

// useEffect(() => {
//   if (user && isAuthenticated) {
//     const userEmail = user.email;
//     sessionStorage.setItem("credentials", JSON.stringify(userEmail));

//     const guardForUserProfile = async (userEmail) => {
//       const tokenId = await getIdTokenClaims();
//       const accessToken = await getTokenSilently();

//       if (tokenId && accessToken) {
//         sessionStorage.setItem("IdToken", JSON.stringify(tokenId));
//         sessionStorage.setItem("accessToken", accessToken);
//       }
//       const getAuthUser = await userManager.getAuthUser(userEmail);

//       if (getAuthUser.length > 0) {
//         const authUserId = getAuthUser[0].id;
//         const getProfile = await userManager.getUserProfileEmbeddedAuthUser(authUserId);
//         const creditsArray = getProfile[0].credits;

//         setAuthUser(getAuthUser[0]);
//         setUserProfile(getProfile[0]);
//         setUserCredits(creditsArray);

//         const djangoAuthToken = sessionStorage.getItem("QuantumToken");
//         setAuthToken(djangoAuthToken);

//         if (appInitOptions.length > 0) {
//           const sessionId = sessionStorage.getItem("sessionId");
//           const csrf = getCookie("csrftoken");
//           let authInitOptions = appInitOptions[0];

//           if (csrf) {
//             authInitOptions["csrf_token"] = csrf;
//           }
//           if (sessionId) {
//             authInitOptions["session_id"] = sessionId;
//           }

//           const updateAuthInitCredentials = await userManager.postInitAppOptions(authInitOptions);
//           setInitOptions(updateAuthInitCredentials);
//           parseUserAgentDataHelper(userAgent, setBrowserData, setUserAgentData);
//           setPlatformOS(platformOperatingSystem);
//           setAppCodeNameData(appCodeName);
//         }
//       } else {
//         console.log("Please Complete your Profile. :) ");
//         setUserProfile([]);
//       }
//     };
//     guardForUserProfile(userEmail);
//   }
// }, [user, getIdTokenClaims, getTokenSilently, isAuthenticated, appInitOptions]);
