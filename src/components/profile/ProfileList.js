import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
import { setResourcesMapFunction } from "../../modules/Helpers";

const ProfileList = props => {
  // const [userProfile, setUserProfile] = useState([]);
  const { user } = useAuth0();
  const [userCredits, setUserCredits] = useState([]);
  const [rollerCoasters, setRollerCoasters] = useState([]);
  const [manufacturer, setManufacturer] = useState({});
  const [park, setPark] = useState({});
  const [trackType, setTrackType] = useState({});

  const getAllCurrentUserCredits = async id => {
    try {
      const userCreditsFromApi = await ApiManager.getAllUserCredits(id);
      setUserCredits(userCreditsFromApi);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRollerCoasters = async () => {
    try {
      const rollerCoastersFromAPI = await ApiManager.getRollerCoasters();
      setRollerCoasters(rollerCoastersFromAPI);
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

  // // get all users
  // const get = async () => {
  //   try {
  //     const usersFromAPI = await ApiManager.getUser();
  //     console.log(usersFromAPI);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllRollerCoasters();
  //   getAllCurrentUserCredits();
  //   get();


  const dataFromAPI = async () => {
    await setResourcesMapFunction(
      setManufacturer,
      setRollerCoasters,
      setPark,
      setTrackType
    );
  };

  useEffect(() => {
    dataFromAPI();
  }, []);


  return (
    <>
      <div className="profile-container">
        <div className="icon-container">
          <div data-tooltip="BACK">
            <i
              className="big arrow circle left icon"
              id="back-arrow-detail"
              onClick={() => props.history.push("/")}
            ></i>
          </div>
          <div data-tooltip="ADD NEW CREDIT">
            <i
              className="big plus square outline icon"
              id="plusIcon"
              onClick={() => props.history.push("/newCredit")}
            ></i>
          </div>
        </div>
        <section className="profile-content">
          <div className="profile-picture">
            {/* <img src={picUrl} alt="Profile Picture" /> */}
          </div>
          <p>{/* <strong>{username}</strong> */}</p>
          {/* <button 
            type="button"
            className="btn"
            onClick={() => {
              props.history.push("/newCredit");
            }}
          >
            Add New Credit
          </button> */}
          <p>
            <strong>Credits</strong>
          </p>
          <div className="profile-container-card">
            {rollerCoasters.map(rollerCoaster => (
              <ProfileCard
                key={rollerCoaster.id}
                rollerCoaster={rollerCoaster}
                manufacturer={manufacturer}
                currentUserProfile={user}
                park={park}
                trackType={trackType}
                deleteCredit={deleteCredit}
                {...props}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfileList;
