import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./LeaderBoard.css";

const LeaderBoard = props => {
  const { user } = useAuth0();

  const [profiles, setProfiles] = useState([]);

  const getAllUsers = async () => {
    try {
      const userProfiles = await ApiManager.getAllUsers();
      setProfiles(userProfiles);
      const creditsArray = userProfiles.map(profile => {
        return {
          firstName: profile.first_name,
          creditCount: profile.credits.map(credit => {
            return credit.rollerCoasterId;
          })
        };
      });
      console.log(creditsArray);
      creditsArray.sort((a, b) => a.creditCount.length - b.creditCount.length);
      creditsArray.reverse();
      return creditsArray;
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
        <p className="name">
          {user.nickname}
          <img id="profile-pic" src={user.picture} alt="My Avatar" />
          {user.email}
        </p>
      </nav>
      <button
        className="leaderBoard-back-btn"
        onClick={() => props.history.push("/home")}
      >
        Back
      </button>
      <div className="leaderBoard-header">
        <p className="leaderBoard-title">LeaderBoard</p>
      </div>
      <div className="leaderBoard-main-content">
        {profiles.map(profile => (
          <div className="profile-elements" key={profile.id}>
            {profile.picUrl ? (
              <img id="profile-pic" src={profile.picUrl} alt="My Avatar" />
            ) : (
              <img id="profile-pic" src={profile.picture} alt="My Avatar" />
            )}
            <p className="name">
              {profile.first_name} {profile.last_name} Credit Count: {}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeaderBoard;
