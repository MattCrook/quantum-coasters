import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "../home/Home.css";
import "../auth/Login.css";
import "bulma/css/bulma.css";

const LandingPage = (props) => {
  const {
    loading,
    user,
    loginWithRedirect,
    clearStorage,
    isAuthenticated,
  } = useAuth0();
  const { isLoggedIn } = props;

  return (
    <>
      <header>
        <nav id="landing_page_nav_bar_container" className="navbar is-dark">
          <div className="landing_page_nav_container_1">
            {/* logo */}
            <div className="navbar-brand">
              <button id="quantum_logo" className="navbar-item">
                Quantum Coasters
              </button>
            </div>
          </div>

          <div className="landing_page_nav_bar_container_2">
            <div className="login_btn_container">
              {!loading && !isAuthenticated && !isLoggedIn && (
                <button
                  onClick={loginWithRedirect}
                  id="landing_page_login_btn"
                  className="navbar-item"
                >
                  Login<i className="fas fa-sign-in-alt"></i>
                </button>
              )}
            </div>
            {/* if for some reason user lands on this page and is logged in, show home and logout button */}
            <div className="logout_landing_page_btn">
              {!loading && user && isAuthenticated && isLoggedIn && (
                <button onClick={clearStorage} className="navbar-item">
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
        <div className="hero is-fullheight">
          <div className="hero-body bg-img" style={{ marginTop: "20px" }}>
            <div className="container has-text-centered login-foo"></div>
          </div>
        </div>
      </header>

      <div className="signature">
        <p>
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
          <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};

export default LandingPage;
