import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
// import { setResourcesJoinFunction } from "../../modules/Helpers";

const ProfileList = props => {
  // const [userProfile, setUserProfile] = useState([]);
  const { user, setUser } = useAuth0();
  const [userCredits, setUserCredits] = useState([]);
  const [rollerCoasters, setRollerCoasters] = useState([]);
  const [manufacturer, setManufacturer] = useState({});
  const [park, setPark] = useState({});
  const [trackType, setTrackType] = useState({});

  //   const getUserCredits = async (id) => {
  //   try {
  //     const userCreditsFromApi = await ApiManager.getAllUserCredits(id);
  //     console.log(userCreditsFromApi)
  //     setUserCredits(userCreditsFromApi);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const dataFromAPI = async () => {
    const rollerCoastersFromAPI = ApiManager.getRollerCoasters;
    const manufacturersFromAPI = ApiManager.getManufacturerWithRollerCoaster;
    const parksFromAPI = ApiManager.getParkWithRollerCoasters;
    const trackTypesFromAPI = ApiManager.getRollerCoastersWithTrackType;
    let values = await Promise.all([
      rollerCoastersFromAPI(),
      manufacturersFromAPI(),
      parksFromAPI(),
      trackTypesFromAPI()
    ]);
    // console.log("values", values);
    const returnedRollerCoastersArray = values[0];
    const returnedManufactureArray = values[1];
    const returnedParksArray = values[2];
    const returnedTrackTypesArray = values[3];
    returnedRollerCoastersArray.forEach(rollerCoaster => {
      const manufacturerArray = returnedManufactureArray.filter(
        manufacturer => manufacturer.id === rollerCoaster.manufacturerId
      );
      const parkArray = returnedParksArray.map(
        park => park.id === rollerCoaster.parkId
      );
      const trackTypeArray = returnedTrackTypesArray.filter(
        trackType => trackType.id === rollerCoaster.trackTypeId
      );
      // console.log("trackTypeArray", trackTypeArray);
      const id = rollerCoaster.id;
      const name = rollerCoaster.name;
      const max_height = rollerCoaster.max_height;
      const max_speed = rollerCoaster.max_speed;
      const trackType = trackTypeArray[0].name;
      const manufacturer = manufacturerArray[0].name;
      const park = parkArray[0].name;
      const rollerCoasterObject = {
        id,
        name,
        max_height,
        max_speed,
        trackType,
        manufacturer,
        park,
      };
      console.log(rollerCoasterObject);
      return rollerCoasterObject;
    });
  };
  // useEffect(() => {
  //   dataFromAPI();
  // }, []);

  useEffect(() => {
    const getUserCreditsForProfile = async () => {
      const userResults = await ApiManager.getAllUserCredits("1");
      console.log("userResults", userResults);
      const resource = dataFromAPI(userResults);
      setRollerCoasters(resource);
      setManufacturer(resource.manufacturer);
      setPark(resource.park);
      setTrackType(resource.trackType);
    };
    getUserCreditsForProfile();
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

// const getAllCurrentUserCredits = async id => {
//   try {
//     const userCreditsFromApi = await ApiManager.getAllUserCredits(id);
//     setUserCredits(userCreditsFromApi);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getAllRollerCoasters = async () => {
//   try {
//     const rollerCoastersFromAPI = await ApiManager.getRollerCoasters();
//     setRollerCoasters(rollerCoastersFromAPI);
//   } catch (error) {
//     console.log(error);
//   }
// };
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
