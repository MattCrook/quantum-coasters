import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "../home/Home.css";
import "bulma/css/bulma.css";


const LoginLandingPage = () => {
  const { loading, user, loginWithRedirect, logout, clearStorage } = useAuth0();


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
              {!loading && !user && (
                <button onClick={loginWithRedirect} className="navbar-item">
                  Login
                </button>
              )}

              {/* if for some reason user lands on this page and is logged in, show home and logout button */}
              {!loading && user && (
                // <button onClick={logout(clearStorage())} className="navbar-item">
                //   Logout
                // </button>
                <button onClick={logout} className="navbar-item">
                Logout
              </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="hero is-fullheight">
        <div className="hero-body bg-img">
          <div className="container has-text-centered login-foo"></div>
        </div>
      </div>
    </header>
  );
};

export default LoginLandingPage;
