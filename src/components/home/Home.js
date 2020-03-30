import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { useAuth0 } from "../../contexts/react-auth0-context";
import ApiManager from "../../modules/ApiManager";
import { Link } from "react-router-dom";
// import NavBar from "../nav/NavBar";

const Home = (props) => {

  const { loading, user, logout } = useAuth0();
  const userProfile = props.userProfile;


  return (
    <header>
      <nav className="navbar is-dark">
        <div className="navbar-menu is-active">
          {/* logo */}
          <div className="navbar-brand">
            <button className="navbar-item">Quantum</button>
          </div>
          {/* menu items */}
          {/* if there is a user. show the logout button */}
          {!loading && user && (
            <>
              <div className="navbar-end">
                <button className="navbar-item">{user.name}</button>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="navbar-item"
                >
                  Logout
                </button>
                {user.picture ? (
                  <img id="profile-pic" src={user.picture} alt="My Avatar" />
                ) : (
                  <img
                    id="profile-pic"
                    src={userProfile.picUrl}
                    alt="My Avatar"
                  />
                )}
                <hr />
              </div>
            </>
          )}
        </div>
        {/* </div> */}
      </nav>

      {!userProfile.id && (
        <>
          <div className="banner-for-complete-profile">
            <h3>
              Welcome! Please click the button below and complete your profile
              to get started using Quantum.
            </h3>
            <Link className="complete-profile-link" to="/profile/welcome">
              Complete Profile
            </Link>
          </div>
        </>
      )}
      <div className="greeting">
        {!loading && user && (
          <>
            <p>Hello {user.nickname}</p>
          </>
        )}
      </div>
      <div className="hero is-fullheight has-background-black-bis ">
        <div className="hero-body bg-img">
          <div className="container has-text-centered login-foo"></div>
        </div>
      </div>
    </header>
  );
};
export default Home;
