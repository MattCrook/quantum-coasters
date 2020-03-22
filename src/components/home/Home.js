import React from "react";
import "bulma/css/bulma.css";
import { useAuth0 } from "../../contexts/react-auth0-context";
// import NavBar from "../nav/NavBar";

const Home = () => {
  const { loading, user, logout } = useAuth0();
  console.log(user);

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
              {/* if there is a user. show the login button */}
              {!loading && user && (
                <>
                  <div className="navbar-end">
                    <button className="navbar-item">{user.name}</button>
                    <button
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                      className="navbar-item"
                    >
                      Logout
                    </button>
                    {user.picture && (
                      <img
                        id="profile-pic"
                        src={user.picture}
                        alt="My Avatar"
                      />
                    )}
                    <hr />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="greeting">
        {!loading && user && (
          <>
            <p>Hello {user.name}</p>
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
