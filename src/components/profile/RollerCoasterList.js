import React, { useState, useEffect } from "react";
import rollerCoasterManager from "../../modules/rollerCoasters/rollerCoasterManager";
import userManager from "../../modules/users/userManager";
// import creditManager from "../../modules/credits/creditManager";
import parkManager from "../../modules/parks/parkManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { Link } from "react-router-dom";


// list that user is taken to, to input new credit (new rollercoaster ridden)
// need check to see if the roller coaster exists in DB, if not user is taken to NewRollerCoasterForm
// to create the entry in DB, then back to their credit form to fill it out.
const RollerCoasterList = (props) => {
  const { user } = useAuth0();
  const [rollerCoasters, setRollerCoasters] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const [credits, setCredits] = useState([]);
  const [parks, setParks] = useState([]);

  // function to populate entire list of rollerCoasters in database
  const rollerCoastersFromAPI = async () => {
    const rollerCoastersData = await rollerCoasterManager.getAllRollerCoastersWithAllExpanded();
    setRollerCoasters(rollerCoastersData);
  };

  const parksFromAPI = async () => {
    const getAllParks = await parkManager.getParks();
    setParks(getAllParks);
  };

  // Grabbing the current user profile and drilling into credits [array] to determine how many/ what credits they have. Will determine on initial render if add button is shown.
  const currentUserProfileCredits = async (user) => {
    const getAuthUser = await userManager.getAuthUser(user.email);
    setAuthUser(getAuthUser[0]);
    const authUserId = getAuthUser[0].id;
    const getProfile = await userManager.getUserProfileEmbeddedAuthUser(
      authUserId
    );
    const profile = getProfile[0];
    const creditsArray = profile.credits;
    setUserProfile(profile);
    setCredits(creditsArray);
  };

  // function to hide the "ADD" button from the user if they already have the rollerCoaster on their profile
  // Returns the credits(which are in State) which don't include the rollercoasterId
  // if "credits" is an object, extract the credit object and push into an array, so we can map over it an return everything but the Ids that the user has.
  // Else, map over the credits normally.
  // let rcIdsArray = [];
  // const showButton = (rollercoasterId, credits) => {
  //   if (typeof credits === "object") {
  //     credits.forEach((credit) => {
  //       rcIdsArray.push(credit);
  //     });
  //     const creditIds = rcIdsArray.map((credit) => {
  //       return credit.rollerCoaster;
  //     });
  //     return !creditIds.includes(rollercoasterId);
  //   } else {
  //     const creditIds = credits.map((credit) => {
  //       return credit.rollerCoaster;
  //     });
  //     return !creditIds.includes(rollercoasterId);
  //   }
  // };

  // // handles user adding the credit. gets the email from State which was set above.
  // // Refactored from above function
  // const handleAddCredit = (rollerCoasterId) => {
  //   const newCreditObj = {
  //     rollerCoaster_id: rollerCoasterId,
  //     userProfile_id: userProfile.id,
  //   };

  //   creditManager.addCredit(newCreditObj).then(() => {
  //     userManager.getAuthUser(user.email).then((userData) => {
  //       const profile = userData[0];
  //       const userId = profile.id;
  //       userManager.getUserProfileEmbeddedAuthUser(userId).then((response) => {
  //         const userProf = response[0];
  //         const creditsArray = userProf.credits;
  //         setUserProfile(userProf);
  //         setCredits(creditsArray);
  //       });
  //     });
  //   });
  // };

  useEffect(() => {
    rollerCoastersFromAPI();
    currentUserProfileCredits(user);
    parksFromAPI();
    return () => user;
  }, [user]);

  return (
    // <>
    //   <div className="roller-coaster-list-container">
    //     <ul className="list-items-container">
    //       {rollerCoasters &&
    //         rollerCoasters.map((rollerCoaster) => (
    //           <li className="list-elements" key={rollerCoaster.id}>
    //             <strong>{rollerCoaster.name} </strong>
    //             {rollerCoaster.park.name}, {rollerCoaster.park.parkCountry}{" "}
    //             {showButton(rollerCoaster.id, credits) && (
    //               <button
    //                 className="add-credit-button"
    //                 onClick={() => handleAddCredit(rollerCoaster.id)}
    //               >
    //                 Add
    //               </button>
    //             )}
    //           </li>
    //         ))}
    //     </ul>
    //   </div>
    // </>

    <>
      <div className="park-coaster-list-container">
        <ul className="park-list-items-container">
          <div className="parks_list_title">Parks</div>
          {parks &&
            parks.map((park) => (
              <li className="park-list-elements" key={park.id}>
                <Link className="park_list_item_link" to={`/rollerCoasters/park/${park.id}`}>
                  {park.name}
                </Link>
                <div className="park_list_location_and_country">
                  {park.parkLocation}, {park.parkCountry}{" "}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default RollerCoasterList;
