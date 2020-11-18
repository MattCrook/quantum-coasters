import React, { useState, useEffect } from "react";
import userManager from "../../modules/users/userManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./LeaderBoard.css";

const LeaderBoard = (props) => {
  const [profiles, setProfiles] = useState([]);
  const { logout, loading, clearStorage } = useAuth0();
  const { userProfile } = props;
  const { authUser } = props;
  const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png";
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";


  // Function to get all users, build a custom object with the credits of each user attached to it, and set that as the profile in state.
  // Then sort the profiles by the length of credits array from most to least.
  const getAllUsers = async () => {
    try {
      const users = await userManager.getAllUsers();
      const profileWithCreditsArray = users.map((user) => {
        const profile = user.user;
        return {
          id: user.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          image: user.image,
          creditCount: user.credits.map((credit) => credit),
        };
      });
      profileWithCreditsArray.sort((a, b) => a.creditCount.length - b.creditCount.length);
      profileWithCreditsArray.reverse();
      setProfiles(profileWithCreditsArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  return (
    <>
      <nav id="nav-container" className="navbar is-dark">
        <div className="leaderboard_container_1">
          <button
            id="quantum_logo_leaderboard"
            className="navbar-item"
            onClick={() => props.history.push("/home")}
          >
            Quantum Coasters
          </button>
        </div>

        <div className="leaderboard_container_2">
          <div className="leaderboard-name">
            <p className="leaderboard-first-and-last-name-in-nav">
              {authUser.first_name} {authUser.last_name}
            </p>
            {!loading && userProfile.image ? (
              <img
                id="profile-pic"
                src={userProfile.image.image}
                alt="My Avatar"
              />
            ) : (
              <img
                id="google-profile-pic"
                src={defaultQPicture}
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

          </div>
        </div>
      </nav>

      <div className="leaderBoard-header">
        <p className="leaderBoard-title">LeaderBoard</p>
        <div className="leaderboard_sub_header">Leaderboard represents all users across Quantum Coasters. Compete for coaster credits to become Coaster King!</div>
      </div>
      <div className="leaderBoard-main-content">
        {profiles.map((profile) => (
          <div className="profile-elements" key={profile.id}>
            {profile.image ? (
              <img id="profile-pic" src={profile.image.image} alt="My Avatar" />
            ) : (
              <img
                id="profile-pic"
                src={defaultProfilePicture}
                alt="My Avatar"
              />
            )}{" "}
            {profile.firstName} {profile.lastName}
            <p className="leaderboard-name">
              Credit Count: {profile.creditCount.length}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeaderBoard;
