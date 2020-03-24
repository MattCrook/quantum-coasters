import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";

// const currentUser = sessionStorage.getItem()

const ProfileList = props => {
  const { user, logout } = useAuth0();
  const [userCredits, setUserCredits] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  console.log({ userProfile });
  console.log("userCredits", userCredits);

  const getUserCredits = async user => {
    try {
      const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
      setUserProfile(userProfileFromAPI[0]);

      console.log(userProfileFromAPI[0]);
      const rollerCoasterIds = userProfileFromAPI[0].credits.map(credit => {
        const creditId = credit.rollerCoasterId;
        console.log(creditId);
        return creditId;
      });

      let promises = [];
      rollerCoasterIds.forEach(creditId => {
        promises.push(ApiManager.getRollerCoastersWithAllExpanded(creditId));
      });
      Promise.all(promises).then(data => {
        console.log("result", data);
        setUserCredits(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserProfile = id => {
    try {
      confirmAlert({
        title: "Confirm to delete",
        message: "Are you sure you want to delete this?",
        buttons: [
          {
            label: "Yes",
            onClick: () => ApiManager.deleteUserProfile(id).then(() => logout())
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
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile-header-container">
          <div className="icon-container">
            {/* <span data-tooltip="BACK">
              <i
                className="big arrow circle left icon"
                id="back-arrow-detail"
                onClick={() => props.history.push("/home")}
              ></i> 
              </span> */}
            {/* <span data-tooltip="ADD NEW CREDIT">
                  <i
                    className="big plus square outline icon"
                    id="plusIcon"
                    onClick={() => props.history.push("/profile/new")}
                  ></i>
                </span> */}

            {/* <span className="profile-back-button">
                <button
                className="big arrow circle left icon"
                id="back-arrow-detail"
                onClick={() => props.history.push("/home")}
              >BACK</button>
            </span> */}

            <span className="profile-add-new">
              {/* <button
                className="big plus square outline icon"
                id="plusIcon"
                onClick={() => props.history.push("/profile/new")}
              >ADD NEW CREDIT</button> */}
            </span>
          </div>
        </div>
        <section className="profile-content">
          <button
            className="big arrow circle left icon"
            id="back-arrow-detail"
            onClick={() => props.history.push("/home")}
          >
            BACK
          </button>
          <button
            className="big plus square outline icon"
            id="plusIcon"
            onClick={() => props.history.push("/users/new")}
          >
            ADD NEW CREDIT
          </button>
          <div className="profile-picture">
            {/* <img src={picUrl} alt="Profile Picture" /> */}
          </div>
          <p>
            <strong>
              {userProfile.first_name} {userProfile.last_name}
            </strong>
          </p>
          <button
            className="delete-profile-button"
            onClick={() => deleteUserProfile(userProfile.id)}
          >
            Delete Profile
          </button>
          {/* <button
            type="button"
            className="btn"
            onClick={() => {
              props.history.push("/profile/new");
            }}
          >
            Add New Credit
          </button> */}
        </section>
        <p>
          <strong>Credits</strong>
        </p>
        <div className="profile-container-card">
          {userCredits.map(rollerCoaster => (
            <ProfileCard
              key={rollerCoaster.id}
              userProfile={userProfile}
              rollerCoaster={rollerCoaster}
              manufacturer={rollerCoaster.manufacturer}
              user={user}
              park={rollerCoaster.park}
              trackType={rollerCoaster.trackType}
              // deleteCredit={deleteCredit}
              {...props}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileList;
