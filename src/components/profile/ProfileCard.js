import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const ProfileCard = props => {
    console.log(props)
  const picUrl = props.currentUserProfile.picture;
  const username = props.currentUserProfile.nickname;
  const user = props.currentUserProfile.user
//   const credits = 

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <img src={picUrl} alt="Profile Picture" />
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
