import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "../home/Home.css";
import "../auth/Login.css";
import "bulma/css/bulma.css";

const LandingPage = () => {
  const { loading, user, loginWithRedirect, clearStorage } = useAuth0();

  return (
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

        {/* menu items */}
        {/* if there is no user. show the login button */}
        <div className="landing_page_nav_bar_container_2">
          <div className="login_btn_container">
            {!loading && !user && (
              <button
                onClick={loginWithRedirect}
                id="landing_page_login_btn"
                className="navbar-item"
              >Login<i className="fas fa-sign-in-alt"></i></button>
            )}
          </div>
          {/* if for some reason user lands on this page and is logged in, show home and logout button */}
          <div className="logout_landing_page_btn">
            {!loading && user && (
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
  );
};

export default LandingPage;
