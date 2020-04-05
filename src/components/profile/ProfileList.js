import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
import "./Profile.css";
import 'react-confirm-alert/src/react-confirm-alert.css'

const ProfileList = props => {
  const { user } = useAuth0();
  const [userCredits, setUserCredits] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const getUserCredits = async user => {
    try {
      const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
      setUserProfile(userProfileFromAPI[0]);
      const rollerCoasterIds = userProfileFromAPI[0].credits.map(credit => {
        const creditId = credit.rollerCoasterId;
        return creditId;
      });

      let promises = [];
      rollerCoasterIds.forEach(creditId => {
        promises.push(ApiManager.getRollerCoastersWithAllExpanded(creditId));
      });
      Promise.all(promises).then(data => {
        setUserCredits(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCredit = rollerCoasterId => {
    try {
      confirmAlert({
        title: "Confirm to delete",
        message: "Are you sure you want to remove this credit?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              ApiManager.getUserProfile(user.email).then(user => {
                user = user[0];
                let credits = user.credits;
                const userId = user.id;
                const filteredCredits = credits.filter(
                  credit => credit.rollerCoasterId !== rollerCoasterId
                );
                ApiManager.deleteCredit(userId, filteredCredits).then(() => {
                  getUserCredits(user);
                });
              });
            }
          },
          {
            label: "No",
            onClick: () => ""
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCredits(user);
  }, [user]);

  return (
    <>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
          <button className="navbar-item">Quantum</button>
          </div>
          <button
            className="add-new-credit-btn" data-testid="add_new_credit_btn_testid"
            onClick={() => props.history.push("/users/new")}
          >
            Add New Credit
          </button>
          <button
            className="edit-profile-button" data-testid="edit_profile_btn_testid"
            onClick={() => props.history.push(`/profile/${userProfile.id}`)}
          >
            Edit Profile
          </button>
          <p className="name">
            {userProfile.first_name} {userProfile.last_name}
            {userProfile.picUrl ? (
              <img id="profile-pic" src={userProfile.picUrl} alt="My Avatar" />
            ) : (
              <img id="profile-pic" src={user.picture} alt="My Avatar" />
            )}
          </p>

        </div>
      </nav>
      <button
        className="profile-back-btn"
        onClick={() => props.history.push("/home")}
      >
        Back
      </button>
      <p className="credits-title">
        Credits
      </p>
      <div className="profile-container-card" data-testid="profile_card_container_testid">
        {userCredits.map(rollerCoaster => (
          <ProfileCard
            key={rollerCoaster.id}
            userProfile={userProfile}
            rollerCoaster={rollerCoaster}
            manufacturer={rollerCoaster.manufacturer}
            user={user}
            park={rollerCoaster.park}
            trackType={rollerCoaster.trackType}
            deleteCredit={deleteCredit}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default ProfileList;
