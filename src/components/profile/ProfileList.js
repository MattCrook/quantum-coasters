import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ApiManager from "../../modules/ApiManager";

const ProfileList = props => {
  const [userProfile, setUserProfile] = useState([]);

  const getUserProfile = async id => {
    try {
      const userProfileFromApi = ApiManager.getProfile(id);
      setUserProfile(userProfileFromApi);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <section className="profile-content">
        <div className="profile-container-cards">
          <ProfileCard key={userProfile.id} currentUserProfile={userProfile} {...props} />
        </div>
      </section>
    </>
  );
};

export default ProfileList;
