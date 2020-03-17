import React from "react";
import "bulma/css/bulma.css";
import { useAuth0 } from "./contexts/react-auth0-context";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";

const App = () => {
  
  // const { isAuthenticated, handleRedirectCallback, isLoading, user, loginWithRedirect, logout } = useAuth0();
  const { isAuthenticated, loading, user } = useAuth0();
  console.log("user", user);
  console.log("auth", isAuthenticated);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Router>

        {/* <div className="hero is-fullheight has-background-black-bis ">
          <div className="hero-body bg-img">
            <div className="container has-text-centered">
              {!isLoading && user && (
                <>
                  <h1>You are logged in!</h1>
                  <p>Hello {user.name}</p>
                </>
              )}
            </div>
          </div>
        </div> */}
        <NavBar />
      <ApplicationViews user={user} isAuthenticated={isAuthenticated} />
      </Router>
    </>
  );
};

export default App;
