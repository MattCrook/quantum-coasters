import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

// list that user is taken to, to input new credit (new rollercoaster ridden)
// need check to see if the roller coaster exists in DB, if not user is taken to NewRollerCoasterForm
// to create the entry in DB, then back to their credit form to fill it out.
const RollerCoasterList = () => {
  const { user } = useAuth0();
  const [rollerCoasters, setRollerCoasters] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const [credits, setCredits] = useState([]);

  // const { authUser } = props;
  // const { userProfile } = props;
  // const creditsArray = userProfile.credits[0]
  // setCredits(creditsArray)


  // function to populate entire list of rollerCoasters in database
  const rollerCoastersFromAPI = async () => {
    const rollerCoastersData = await ApiManager.getAllRollerCoastersWithAllExpanded();
    setRollerCoasters(rollerCoastersData);
  };

  // Grabbing the current user profile and drilling into credits [array] to determine how many/ what credits they have. Will determine on initial render if add button is shown.
  const currentUserProfileCredits = async (user) => {
    const getAuthUser = await ApiManager.getAuthUser(user.email);
    setAuthUser(getAuthUser[0]);
    const authUserId = getAuthUser[0].id;
    const getProfile = await ApiManager.getUserProfileEmbededAuthUser(authUserId);
    const profile = getProfile[0];
    const creditsArray = profile.credits;
    setUserProfile(profile);
    setCredits(creditsArray);

  };

  // function to hide the "ADD" button from the user if they already have the rollerCoaster on their profile
  // Returns the credits(which are in State) which don't include the rollercoasterId
  const showButton = (rollercoasterId, credits) => {
    const creditIds = credits.map((credit) => {
      return credit;
    });
    return !creditIds.includes(rollercoasterId);
  };

  // handles user adding the credit. gets the email from State which was set above.
  // Refactored from above function
  const handleAddCredit = (rollerCoasterId) => {
    const newCreditObj = {
      rollerCoaster_id: rollerCoasterId,
      userProfile_id: userProfile.id,
    };

    ApiManager.addCredit(newCreditObj).then(() => {
      // ApiManager.getUserProfile(user.email).then((userData) => {
      //   const profile = userData[0];
      //   const creditsArray = profile.userprofile.rollerCoaster_id;
      //   setUserProfile(profile);
      //   setCredits(creditsArray);
      // });
      currentUserProfileCredits(user);
    });
  };

  useEffect(() => {
    rollerCoastersFromAPI();
    currentUserProfileCredits(user);
    return () => (user);
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
