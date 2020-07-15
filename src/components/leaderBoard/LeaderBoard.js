import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./LeaderBoard.css";


const LeaderBoard = props => {

  const [profiles, setProfiles] = useState([]);
  const { userProfile } = props;
  const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png"
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";



  const getAllUsers = async () => {
    try {
      const users = await ApiManager.getAllUsers();
      const profileWithCreditsArray = users.map(user => {
        const profile = user.user;
        return {
          id: user.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          image: user.image,
          creditCount: user.credits.map(credit => credit)
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
        <button
          className="navbar-item"
          onClick={() => props.history.push("/home")}
        >
          Quantum
        </button>
        <div className="leaderboard-name">
          <p className="leaderboard-first-and-last-name-in-nav">
          {userProfile.user.first_name} {userProfile.user.last_name}
          </p>
          {userProfile.image ? (
            <img id="profile-pic" src={userProfile.image.image} alt="My Avatar" />
          ) : (
            <img id="google-profile-pic" src={defaultQPicture} alt="My Avatar" />
          )}
        </div>
      </nav>

      <div className="leaderBoard-header">
        <p className="leaderBoard-title">LeaderBoard</p>
      </div>
      <div className="leaderBoard-main-content">
        {profiles.map(profile => (
          <div className="profile-elements" key={profile.id}>
            {profile.image ? (
              <img id="profile-pic" src={profile.image.image} alt="My Avatar" />
            ) : (
              <img id="profile-pic" src={defaultProfilePicture} alt="My Avatar" />
            )}{" "}
            {profile.firstName}{" "}{profile.lastName}
            <p className="leaderboard-name">Credit Count: {profile.creditCount.length}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeaderBoard;
