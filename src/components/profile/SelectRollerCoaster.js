import React, { useState, useEffect } from "react";
import rollerCoasterManager from "../../modules/rollerCoasters/rollerCoasterManager";
import userManager from "../../modules/users/userManager";
import creditManager from "../../modules/credits/creditManager";
import parkManager from "../../modules/parks/parkManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./SelectRollerCoaster.css";

const SelectRollerCoaster = (props) => {

  const { loading, user } = useAuth0();
  const parkId = props.parkId;
  const { userCredits } = props;
  const { setUserCredits } = props;
  const { setUserProfile } = props;
  const [rollerCoasters, setRollerCoasters] = useState([]);
  const [park, setPark] = useState([]);


  const getRollerCoastersInPark = async () => {
    const rollerCoastersFromApi = await rollerCoasterManager.getRollerCoastersByParkId(parkId);
    setRollerCoasters(rollerCoastersFromApi);
  };

  const getParkFromParkId = async (parkId) => {
    const parkFromApi = await parkManager.retrievePark(parkId);
    setPark(parkFromApi);
  };

  // function to hide the "ADD" button from the user if they already have the rollerCoaster on their profile
  // Returns the credits(which are in State) which don't include the rollercoasterId
  // if "credits" is an object, extract the credit object and push into an array, so we can map over it an return everything but the Ids that the user has.
  // Else, map over the credits normally.
  let rcIdsArray = [];
  const showButton = (rollercoasterId, credits) => {
    if (typeof credits === "object") {
      credits.forEach((credit) => {
        rcIdsArray.push(credit);
      });
      const creditIds = rcIdsArray.map((credit) => {
        return credit.rollerCoaster;
      });
      return !creditIds.includes(rollercoasterId);
    } else {
      const creditIds = credits.map((credit) => {
        return credit.rollerCoaster;
      });
      return !creditIds.includes(rollercoasterId);
    }
  };

  const handleAddCredit = (rollerCoasterId) => {
    const newCreditObj = {
      rollerCoaster_id: rollerCoasterId,
      userProfile_id: props.userProfile.id,
    };
    creditManager.addCredit(newCreditObj).then(() => {
      userManager.getAuthUser(user.email).then((userData) => {
        const profile = userData[0];
        const userId = profile.id;
        userManager.getUserProfileEmbeddedAuthUser(userId).then((response) => {
          const userProf = response[0];
          const creditsArray = userProf.credits;
          setUserProfile(userProf);
          setUserCredits(creditsArray);
        });
      });
    });
  };

  useEffect(() => {
    if (!loading && props) {
      getRollerCoastersInPark();
      getParkFromParkId(parkId);
    }
  }, [props, parkId, loading]);

  return (
    <>
      <div className="nav_banner_rollercoaster_select">
        <div className="navbar_brand_logo">
          <div id="quantum_logo">Quantum Coasters</div>
        </div>

        <div className="back_btn_container_select_rollercoaster">
          <button
            className="go_back_to_ridelist_btn"
            onClick={() => props.history.push("/user/parks/addcredit")}
          >
            <i className="fas fa-step-backward"></i>Back
          </button>
        </div>
      </div>

      <div className="select_ride_header_container">
        <div className="roller_coaster_select_header">
          Select A Ride in {park.name}
        </div>
      </div>
      <div className="roller-coaster-list-container">
        <ul className="ride_list_items_container">
          {rollerCoasters &&
            rollerCoasters.map((rollerCoaster) => (
              <li className="ride_list_elements" key={rollerCoaster.id}>
                <div className="ride_name_select_ride">
                  {rollerCoaster.name}
                </div>
                {showButton(rollerCoaster.id, userCredits) ? (
                  <button
                    className="add_credit_button"
                    onClick={() => handleAddCredit(rollerCoaster.id)}
                  >Add</button>
                ) : (
                    <div className="check_mark_ride_list">
                      {/* <i className="far fa-check-circle"></i> */}
                      <i className="fas fa-check"></i>
                      {/* <i className="fas fa-user-check"></i> */}

                    </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default SelectRollerCoaster;
