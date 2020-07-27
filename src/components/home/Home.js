import React, {useEffect} from "react";
import "bulma/css/bulma.css";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { Link } from "react-router-dom";
import "./Home.css";
import Authenticate from "../auth/Authenticate"

const Home = (props) => {
  const { loading, user, logout, clearStorage, isAuthenticated } = useAuth0();
  const { userProfile } = props;
  const { authUser } = props;
  const { authToken } = props;
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
  console.log("home", authToken)



  return (
    <header>
      <nav id="home_navbar_container" className="navbar is-dark">
        <div className="navbar-menu is-active">
          {/* logo */}
          <button className="home-logo">Quantum Coasters</button>
          {/* menu items */}
          {/* if there is a user. show the logout button */}
          {!loading && user && userProfile && isAuthenticated && (
            <>
              <div className="navbar-end">
                <button className="navbar-item-home-name">{authUser.first_name} {authUser.last_name}</button>
                {!loading && userProfile.image ? (
                  <img
                    data-testid="home-profile-pic-testid"
                    id="profile-pic"
                    src={userProfile.image.image}
                    alt="My Avatar"
                  />
                ) : (
                  <img
                    data-testid="home-profile-pic-testid"
                    id="profile-pic"
                    src={defaultProfilePicture}
                    alt="My Avatar"
                  />
                )}
                <div className="logout_btn_home_container">
                  <button
                    onClick={() => logout({ returnTo: window.location.origin }, clearStorage())}
                    className="logout-navbar-item"
                    data-testid="logout-btn-testid"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {!authUser.email && !loading && user && isAuthenticated && (
        <>
          <div className="banner-for-complete-profile">
            <h3
              className="welcome-greeting"
              data-testid="welcome-greeting-testid"
            >
              Welcome! Please click the button below and complete your profile
              to get started using Quantum.
            </h3>
          </div>
        </>
      )}
      <div className="hero is-fullheight">
        {!loading && !authUser.email && (
          <Link
            data-testid="complete-profile-btn-testid"
            className="complete-profile-link"
            to="register/"
          >
            Complete Profile
          </Link>
        )}
        <div className="hero-body bg-img" style={{ marginTop: "20px" }}></div>
      </div>
    <div href="#modal-1" data-micromodal-trigger="modal-1" >
      {!loading && user && userProfile && isAuthenticated && !authToken[0] ? (
          <Authenticate {...props}/>
      ): null}

    </div>
    </header>
  );
};
export default Home;

// if using the location object, and adding guard, grab the state of userProfile passed thru props (from register)
/* const userProfile = props.location && props.location.state && props.location.state.userProfile */
