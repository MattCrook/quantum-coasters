import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/auth0-context";


const ProfileList = props => {
  const [userProfile, setUserProfile] = useState([]);
  const { user } = useAuth0();


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
          <ProfileCard key={userProfile.id} currentUserProfile={user} {...props} />
        </div>
      </section>
    </>
  );
};

export default ProfileList;
