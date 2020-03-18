import React from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import "../home/Home.css";
import "bulma/css/bulma.css";

// import { NavLink } from "react-router-dom";
// import { withRouter } from "react-router-dom"

const LoginLandingPage = () => {
  const { isLoading, user, loginWithRedirect } = useAuth0();

  return (
    <header>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-menu is-active">
            {/* logo */}
            <div className="navbar-brand">
              <button className="navbar-item">Quantum</button>
            </div>

            {/* menu items */}
            <div className="navbar-end">
              {/* if there is no user. show the login button */}
              {!isLoading && !user && (
                <button onClick={loginWithRedirect} className="navbar-item">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="hero is-fullheight has-background-black-bis ">
        <div className="hero-body bg-img">
          <div className="container has-text-centered login-foo"></div>
        </div>
      </div>
    </header>
  );
};

export default LoginLandingPage;
