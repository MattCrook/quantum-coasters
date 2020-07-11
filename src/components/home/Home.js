import React from "react";
import "bulma/css/bulma.css";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = (props) => {
  const { loading, user, logout, clearStorage } = useAuth0();
  console.log({ props })
  const { userProfile } = props;
  const { authUser } = props;


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
                {userProfile.image ? (
                  <img
                    data-testid="home-profile-pic-testid"
                    id="profile-pic"
                    // src={userProfile.picUrl}
                    // TODO: Change back to above after figure out API CAll to cloudinary
                    src={userProfile.image.url}
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

      {!authUser.username && !loading && user && (
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
        {!loading && !authUser.username && (
          <Link data-testid="complete-profile-btn-testid" className="complete-profile-link" to="register/">
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
