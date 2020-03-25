import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

// list that user is taken to, to input new credit (new rollercoaster ridden)
// need check to see if the roller coaster exists in DB, if not user is taken to NewRollerCoasterForm
// to create the entry in DB, then back to their credit form to fill it out.
const RollerCoasterList = props => {
  // const userProfileCreditIds = props.userProfile.credits;
  const currentUserProfileCredits = props.userProfile.credits;
  // console.log("userProfileCreditIds", userProfileCreditIds);


  const { user } = useAuth0();
  const [rollerCoasters, setRollerCoasters] = useState([]);

  // const [userProfile, setUserProfile] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const rollerCoastersFromAPI = async () => {
    const rollerCoastersData = await ApiManager.getAllRollerCoastersWithAllExpanded();
    setRollerCoasters(rollerCoastersData);
  };

  const hideAddButton = (credits, rollerCoasterId) => {
    for (let i = 0; i < credits.length; i++)
      if (credits[i] === rollerCoasterId) {
        return false;
      } else {
        return true;
      }
  };

  const handleAddCredit = rollerCoasterId => {
    ApiManager.getUserProfile(user.email).then(user => {
      user = user[0];
      let credits = user.credits;
      credits.push({ rollerCoasterId });
      const id = user.id;
      ApiManager.addCredit(id, credits).then(userProfile =>
        console.log("userProfile", userProfile)
      );
    });
  };

  useEffect(() => {
    rollerCoastersFromAPI();
    // currentUserProfile(user);
  }, []);

  return (
    <>
      <div className="roller-coaster-list-container">
        <ul className="list-items-container">
          {rollerCoasters.map(rollerCoaster => (
            <li className="list-elements" key={rollerCoaster.id}>
              <strong>{rollerCoaster.name} </strong>
              {rollerCoaster.park.name}, {rollerCoaster.park.parkCountry}{" "}
              {/* {rollerCoaster.id }===  {userProfileCreditIds} */}
              {/* {rollerCoaster.id !== currentUserProfile.credits && ( */}
              {hideAddButton(currentUserProfileCredits[0].rollerCoasterId, rollerCoaster.id) && (
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

// function filterCredits(credits, rollerCoasterId) {
//   if (credits.contains(rollerCoasterId)) {
//     return false
//   } else {
//     return true;
//   }
// }
// if (credits.contains(rollerCoasterId)) {
// {rollerCoaster.id }===  {userProfileCreditIds} 
// {rollerCoaster.id !== currentUserProfile.credits && 
