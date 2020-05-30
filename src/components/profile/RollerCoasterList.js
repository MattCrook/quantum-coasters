import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

// list that user is taken to, to input new credit (new rollercoaster ridden)
// need check to see if the roller coaster exists in DB, if not user is taken to NewRollerCoasterForm
// to create the entry in DB, then back to their credit form to fill it out.
const RollerCoasterList = (props) => {
  console.log("PROPS", props);
  const { user } = useAuth0();
  const [rollerCoasters, setRollerCoasters] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [credits, setCredits] = useState([]);
  // console.log("USERPROFILE1", userProfile);

  // function to populate entire list of rollerCoasters in database
  const rollerCoastersFromAPI = async () => {
    const rollerCoastersData = await ApiManager.getAllRollerCoastersWithAllExpanded();
    setRollerCoasters(rollerCoastersData);
  };

  // Grabbing the current user profile and drilling into credits [array] to determine how many/ what credits they have. Will determine on initial render if add button is shown.
  const currentUserProfileCredits = (user) => {
    ApiManager.getUserProfile(user.email).then((data) => {
      const profile = data[0];
      const creditsArray = profile.userprofile.rollerCoaster_id;
      setUserProfile(profile);
      setCredits(creditsArray);
    });
  };

  // function to hide the "ADD" button from the user if they already have the rollerCoaster on their profile
  const showButton = (rollercoasterId, credits) => {
    const creditIds = credits.map((credit) => {
      return credit.rollerCoasterId;
    });
    return !creditIds.includes(rollercoasterId);
  };

  // handles user adding the credit. gets the email from State which was set above
  // puts the rollerCoasterId into an array,
  // POSTs to the userProfile
  // const handleAddCredit = (rollerCoasterId) => {
  //   let credits = userProfile.userprofile.rollerCoaster_id;
  //   credits.push({ rollerCoasterId });
  //   const id = userProfile.userprofile.id;
  //   ApiManager.addCredit(id, credits).then(() => {
  //     ApiManager.getUserProfile(user.email).then((userData) => {
  //       const profile = userData[0];
  //       const creditsArray = profile.userprofile.rollerCoaster_id;
  //       setUserProfile(profile);
  //       setCredits(creditsArray);
  //     });
  //   });
  // };

  const handleAddCredit = (rollerCoasterId) => {
    // const userProfileId = userProfile.userprofile.id;
    // const creditId = rollerCoaster.id;

    const newCreditObj = {
      rollerCoaster_id: rollerCoasterId,
      userProfile_id: userProfile.userprofile.id
    }

    ApiManager.addCredit(newCreditObj).then(() => {
      ApiManager.getUserProfile(user.email).then((userData) => {
        const profile = userData[0];
        const creditsArray = profile.userprofile.rollerCoaster_id;
        setUserProfile(profile);
        setCredits(creditsArray);
      });
    });
  };

  useEffect(() => {
    rollerCoastersFromAPI();
    currentUserProfileCredits(user);
    return () => user;
  }, [user]);

  return (
    <>
      <div className="roller-coaster-list-container">
        <ul className="list-items-container">
          {rollerCoasters &&
            rollerCoasters.map((rollerCoaster) => (
              <li className="list-elements" key={rollerCoaster.id}>
                <strong>{rollerCoaster.name} </strong>
                {rollerCoaster.park.name}, {rollerCoaster.park.parkCountry}{" "}
                {showButton(rollerCoaster.id, credits) && (
                  <button
                    className="add-credit-button"
                    onClick={() => handleAddCredit(rollerCoaster.id)}
                  >
                    Add
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default RollerCoasterList;
