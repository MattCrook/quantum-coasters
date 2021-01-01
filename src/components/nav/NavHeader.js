import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useAuthUser } from "../../contexts/AuthUserContext";



const NavHeader = () => {
    const { loading, user, isAuthenticated, clearStorage, djangoRestAuthLogout, logout } = useAuth0()
    const { authUser, userProfile } = useAuthUser();
    const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

  return (
    <>
      <header>
        <nav id="home_navbar_container" className="navbar is-dark">
          <div className="navbar-menu is-active">
            <button className="home-logo">Quantum Coasters</button>
            {!loading && user && isAuthenticated && (
              <>
                <div className="navbar-end">
                  {authUser.email ? (
                    <button className="navbar-item-home-name">
                      {authUser.first_name} {authUser.last_name}
                    </button>
                  ) : (
                    <div className="navbar_item_home_user_name">{user.email}</div>
                  )}
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
                      onClick={() => djangoRestAuthLogout(logout, clearStorage, authUser)}
                      className="logout-navbar-item"
                      data-testid="logout-btn-testid"
                    >
                      Logout
                    </button>
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavHeader;
