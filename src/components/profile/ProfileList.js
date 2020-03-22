import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";

const ProfileList = props => {
  const { user } = useAuth0();
  const [userCredits, setUserCredits] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const getUserCredits = async () => {
    try {
      const dataFromAPI = await ApiManager.getUser("1");
      setUserProfile(dataFromAPI);
      const rollerCoasterIds = dataFromAPI.credits.map(credit => {
        const rollerCoasterId = credit.rollerCoasterId;
        return rollerCoasterId;
      });
      let promises = [];
      rollerCoasterIds.forEach(rollerCoasterId => {
        promises.push(
          ApiManager.getRollerCoastersWithAllExpanded(rollerCoasterId)
        );
      });
      Promise.all(promises).then(data => {
        console.log("result", data);
        setUserCredits(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCredit = id => {
    try {
      confirmAlert({
        title: "Confirm to delete",
        message: "Are you sure you want to delete this?",
        buttons: [
          {
            label: "Yes",
            onClick: () =>
              ApiManager.deleteCredit(id).then(() => {
                ApiManager.getAllRollerCoastersWithUserId(user.id).then(
                  setUserCredits
                );
              })
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
    getUserCredits();
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile-header-container">
          <div className="icon-container">
            <span data-tooltip="BACK">
              <i
                className="big arrow circle left icon"
                id="back-arrow-detail"
                onClick={() => props.history.push("/home")}
              ></i>
            </span>
            <span data-tooltip="ADD NEW CREDIT">
              <i
                className="big plus square outline icon"
                id="plusIcon"
                onClick={() => props.history.push("/profile/new")}
              ></i>
            </span>
          </div>
        </div>
        <section className="profile-content">
          <div className="profile-picture">
            {/* <img src={picUrl} alt="Profile Picture" /> */}
          </div>
          <p>
            <strong>
              {userProfile.first_name} {userProfile.last_name}
            </strong>
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              props.history.push("/profile/new");
            }}
          >
            Add New Credit
          </button>
        </section>
        <p>
          <strong>Credits</strong>
        </p>
        <div className="profile-container-card">
          {userCredits.map(rollerCoaster => (
            <ProfileCard
              key={rollerCoaster.id}
              rollerCoaster={rollerCoaster}
              manufacturer={rollerCoaster.manufacturer}
              currentUserProfile={user}
              park={rollerCoaster.park}
              trackType={rollerCoaster.trackType}
              deleteCredit={deleteCredit}
              {...props}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileList;
