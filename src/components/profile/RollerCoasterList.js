import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

// list that user is taken to, to input new credit (new rollercoaster ridden)
// need check to see if the roller coaster exists in DB, if not user is taken to NewRollerCoasterForm
// to create the entry in DB, then back to their credit form to fill it out.
const RollerCoasterList = props => {
  const { user } = useAuth0();
  const [rollerCoasters, setRollerCoasters] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [credits, setCredits] = useState([]);
  

  // function to populate entire list of rollerCoasters in database
  const rollerCoastersFromAPI = async () => {
    const rollerCoastersData = await ApiManager.getAllRollerCoastersWithAllExpanded();
    setRollerCoasters(rollerCoastersData);
  };

  const currentUserProfileCredits = user => {
    ApiManager.getUserProfile(user.email).then(user => {
      user = user[0];
      let creditsArray = user.credits;
      setUserProfile(user);
      setCredits(creditsArray);
    });
  };

  // function to hide the "ADD" button from the user if they already have
  const showButton = (rollercoasterId, credits) => {
    const creditIds = credits.map(credit => {
      return credit.rollerCoasterId;
    });
    return !creditIds.includes(rollercoasterId);
  };

  // handles user adding the credit. gets the email from Auth0,
  // matches email from to email in JSON server, puts the rollerCoasterId into an array,
  // POSTs to the userProfile
  const handleAddCredit = rollerCoasterId => {
    ApiManager.getUserProfile(user.email).then(user => {
      user = user[0];
      let credits = user.credits;
      credits.push({ rollerCoasterId });
      const id = user.id;
      ApiManager.addCredit(id, credits).then(credits => {
        ApiManager.getUserProfile(user.email).then(user => {
          user = user[0];
          let creditsArray = user.credits;
          setUserProfile(user);
          setCredits(creditsArray);
        });
      });
    });
  };

  useEffect(() => {
    rollerCoastersFromAPI();
    currentUserProfileCredits(user);
  }, []);

  return (
    <>
      <div className="roller-coaster-list-container">
        <ul className="list-items-container">
          {rollerCoasters && rollerCoasters.map(rollerCoaster => (
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
