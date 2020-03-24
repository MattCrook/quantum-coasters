import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

// list that user is taken to, to input new credit (new rollercoaster ridden)
// need check to see if the roller coaster exists in DB, if not user is taken to NewRollerCoasterForm
// to create the entry in DB, then back to their credit form to fill it out.
const RollerCoasterList = props => {
  const { user, history, loading } = useAuth0();
  const [rollerCoasters, setRollerCoasters] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);

  const rollerCoastersFromAPI = async () => {
    const rollerCoastersData = await ApiManager.getAllRollerCoastersWithAllExpanded();
    console.log("rollerCoastersData", rollerCoastersData);
    setRollerCoasters(rollerCoastersData);
  };

  const handleAddCredit = rollerCoasterId => {
    ApiManager.getUserProfile(user.email).then(user => {
      user = user[0];
      let credits = user.credits;
      credits.push({ rollerCoasterId });
      const id = user.id;
      ApiManager.addCredit(id, credits).then(userProfile =>
        console.log(userProfile)
      );
    });
  };

  useEffect(() => {
    rollerCoastersFromAPI();
  }, []);

  return (
    <>
      <div className="roller-coaster-list-container">
        <ul className="list-items-container">
          {rollerCoasters.map(rollerCoaster => (
            <li className="list-elements" key={rollerCoaster.id}>
              <strong>{rollerCoaster.name} </strong>
              {rollerCoaster.park.name}, {rollerCoaster.park.parkCountry}{" "}
              <button
                className="add-credit-button"
                onClick={() => handleAddCredit(rollerCoaster.id)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default RollerCoasterList;
