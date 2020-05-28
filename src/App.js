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
// import accessToken from "./utils/reducers/authReducers";
//browser-tabs-lock-key-auth0.lock.getTokenSilently

const App = (props) => {
  const { loading, user, getTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = useState([]);
  const [userFromAuth0, setUserFromAuth0] = useState([])

  // fetching the userProfile (when i was using json server) to check if there is one. Will determine conditional rendering
  // further down in app. If there is no user profile, the rest of the app is blocked or hidden so user has to fill out
  // complete profile form.
  // const email = user.email
  // const user = user


  // useEffect(() => {
  //   if (user) {
  //     const userEmail = user.email;
  //     console.log(userEmail)
  //     getTokenSilently(user)
  //       .then((response) => {
  //         localStorage.setItem("accessToken", JSON.stringify(response));
  //       })
  //         ApiManager.getUserProfile(userEmail)
  //           .then((userProfileFromAPI) => {
  //             console.log(userProfileFromAPI)
  //             if (userProfileFromAPI.length > 0) {
  //               sessionStorage.setItem("credentials", JSON.stringify(userEmail));
  //               // const sub = user.sub;
  //               // localStorage.setItem("user_sub_token_id", sub);
  //               setUserProfile(userProfileFromAPI[0]);
  //             } else {
  //               console.log("DON'T HAVE USER YET.");
  //               setUserProfile({});
  //             }
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       // })
  //     //   .catch((err) => {
  //     //     console.log(err);
  //     // })
  //   }
  //   return () => user;
  // }, [user, getTokenSilently]);


  useEffect(() => {
    if (user) {
      const userEmail = user.email;
      console.log("USEREMAIL", userEmail)
        const guardForUserProfile = async (userEmail) => {
          const token = await getTokenSilently(user)
          const getProfile = await ApiManager.getUserProfile(userEmail)
          console.log("GETPROFILE", getProfile)
          localStorage.setItem("accessToken", JSON.stringify(token));
          console.log("USER", user)
          if (userProfile.length > 0) {
            sessionStorage.setItem("credentials", JSON.stringify(userEmail));
            setUserProfile(user);
            console.log("USERPROFILE", userProfile)
          } else {
            console.log("DON'T HAVE USER YET.");
            setUserProfile([]);
          }
        }

        guardForUserProfile()
      }
      // return () => user;
    }, [user]);
 











  if (loading) {
    return <div className="loading_pop_up">Loading...</div>;
  }

  return (
    <>
      <CssBaseline />
      <Router history={history}>
        <NavBar
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          {...props}
        />
        <ApplicationViews
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          {...props}
        />
      </Router>
    </>
  );
};
export default App;
