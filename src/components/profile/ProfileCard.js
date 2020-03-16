import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const ProfileCard = props => {
    console.log(props)
  const picUrl = props.picture;
  const username = props.username;
  const user = props.currentUserProfile

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <img src={picUrl} alt="Avatar" />
        <p>
          <strong>{username}</strong>
        </p>
        <div className="profile-credits">
            Credits:
        </div>
      </div>
    </div>
  );
};
 export default ProfileCard;
