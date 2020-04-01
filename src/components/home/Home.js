import React from "react";
import "bulma/css/bulma.css";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ userProfile }) => {

  const { loading, user, logout } = useAuth0();

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
                <button className="navbar-item">{user.name}</button>
                {userProfile.picUrl ? (
                  <img
                    id="profile-pic"
                    src={userProfile.picUrl}
                    alt="My Avatar"
                  />
                ) : (
                  <img id="profile-pic" src={user.picture} alt="My Avatar" />
                )}
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="logout-navbar-item"
                >
                  Logout
                </button>
                <hr />
              </div>
            </>
          )}
        </div>
      </nav>

      {!userProfile.email && !loading && user && (
        <>
          <div className="banner-for-complete-profile">
            <h3 className="welcome-greeting">
              Welcome! Please click the button below and complete your profile
              to get started using Quantum.
            </h3>
          </div>
        </>
      )}
      <div className="greeting">
        {!loading && user && (
          <>
            <p>Hello {user.nickname}!</p>
          </>
        )}
      </div>
      <div className="hero is-fullheight has-background-black-bis ">
        {!loading && !userProfile.email && (
          <Link className="complete-profile-link" to="/profile/welcome">
            Complete Profile
          </Link>
        )}
        <div className="hero-body bg-img"></div>
      </div>
    </header>
  );
};
export default Home;

// const [userProfile, setUserProfile] = useState({...props.userProfile});
// const userProfile = props.location && props.location.state && props.location.state.userProfile

// useEffect(() => {
//   let isCurrent = true;
//   if (props.userProfile.id) {
//     setUserProfile(props.location.state.userProfile)
//   } else {
//     setUserProfile({});
//   }
// }, []);

// const isProfileCompleted = async user => {
//   if (user) {
//     ApiManager.getUserProfile(user.email)
//       .then(userProfileFromAPI => {
//         sessionStorage.setItem("credentials", JSON.stringify(user.email));
//         if (userProfileFromAPI.length > 0) {
//           setUserProfile(userProfileFromAPI[0]);
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   } else {
//     console.log("DONT HAVE USER YET.");
//     setUserProfile({});
//   }
// };
