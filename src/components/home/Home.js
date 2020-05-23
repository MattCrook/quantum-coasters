import React from "react";
import "bulma/css/bulma.css";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ userProfile }) => {
  const { loading, user, logout, clearStorage } = useAuth0();


  return (
    <header>
      <nav className="navbar is-dark">
        <div className="navbar-menu is-active">
          {/* logo */}
          <button className="home-logo">Quantum</button>
          {/* menu items */}
          {/* if there is a user. show the logout button */}
          {!loading && user && (
            <>
              <div className="navbar-end">
                <button className="navbar-item-home-name">{user.name}</button>
                {userProfile.picUrl ? (
                  <img
                    data-testid="home-profile-pic-testid"
                    id="profile-pic"
                    src={userProfile.picUrl}
                    alt="My Avatar"
                  />
                ) : (
                  <img
                    data-testid="home-profile-pic-testid"
                    id="profile-pic"
                    src={user.picture}
                    alt="My Avatar"
                  />
                )}
                <button
                  onClick={() => logout({ returnTo: window.location.origin }, clearStorage())}
                  className="logout-navbar-item"
                  data-testid="logout-btn-testid"
                >
                  Logout
                </button>
                <hr />
              </div>
            </>
          )}
        </div>
      </nav>

      <div className="greeting">
        {!loading && user && (
          <>
            <p>Hello {user.nickname}!</p>
          </>
        )}
      </div>

      {!userProfile.email && !loading && user && (
        <>
          <div className="banner-for-complete-profile">
            <h3 className="welcome-greeting" data-testid="welcome-greeting-testid">
              Welcome! Please click the button below and complete your profile
              to get started using Quantum.
            </h3>
          </div>
        </>
      )}
      <div className="hero is-fullheight">
        {!loading && !userProfile.email && (
          <Link data-testid="complete-profile-btn-testid" className="complete-profile-link" to="/profile/welcome">
            Complete Profile
          </Link>
        )}
        <div className="hero-body bg-img"></div>
      </div>
    </header>
  );
};
export default Home;

// if using the location object, and adding guard, grab the state of userProfile passed thru props (from register)
/* const userProfile = props.location && props.location.state && props.location.state.userProfile */
