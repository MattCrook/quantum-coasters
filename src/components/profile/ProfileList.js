import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

const ProfileList = props => {
  // const [userProfile, setUserProfile] = useState([]);
  const [userCredits, setUserCredits] = useState([]);
  const { user } = useAuth0();
  console.log("user", user);

  const getAllCurrentUserCredits = async id => {
    try {
      const userCreditsFromApi = ApiManager.getAllCurrentUserCredits(id);
      console.log(userCreditsFromApi);
      setUserCredits(userCreditsFromApi);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCredit = user => {
    try {
      ApiManager.deleteCredit(user);
      const creditsFromAPI = ApiManager.getAllCurrentUserCredits();
      setUserCredits(creditsFromAPI);
    } catch (error) {
      console.log(error);
    }
  };

  const get = async () => {
    try {
      const usersFromAPI = await ApiManager.getUser();
      console.log(usersFromAPI);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAllCurrentUserCredits();
    get();
  }, []);

  return (
    <>
      <section className="profile-content">
        <button
          type="button"
          className="btn"
          onClick={() => {
            props.history.push("/users/newCredit");
          }}
        >
          Add New Credit
        </button>
        <div className="profile-container-card">
          <ProfileCard
            key={userCredits.id}
            currentUserProfile={user}
            deleteCredit={deleteCredit}
            {...props}
          />
        </div>
      </section>
    </>
  );
};

export default ProfileList;
