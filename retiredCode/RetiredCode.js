// This is a folder of most the old code which was removed during the Refactor from using Json server then later in wrapping app in Auth0 and massive rework/ refactor, to using my own custom built API

// const { Form } = require("semantic-ui-react")


/******************** ***********************************/
/************************ ******************************/


// // From RollerCoasterList.js
// //   handles user adding the credit. gets the email from State which was set above
// //   puts the rollerCoasterId into an array,
// //   POSTs to the userProfile
//   const handleAddCredit = (rollerCoasterId) => {
//     let credits = userProfile.userprofile.rollerCoaster_id;
//     credits.push({ rollerCoasterId });
//     const id = userProfile.userprofile.id;
//     ApiManager.addCredit(id, credits).then(() => {
//       ApiManager.getUserProfile(user.email).then((userData) => {
//         const profile = userData[0];
//         const creditsArray = profile.userprofile.rollerCoaster_id;
//         setUserProfile(profile);
//         setCredits(creditsArray);
//       });
//     });
//   };


/******************** ***********************************/
/************************ ******************************/


// From API Manager
// async getUserProfile(email) {
//   const resp = await fetch(`${remoteURL}/users?email=${email}`, {
//     method: "GET",
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: 'JWT' + localStorage.getItem("accessToken"),
//     },
//   })
//   return await resp.json();
// },

/******************** ***************************************/
/************************ ******************************/



// From ProfileList.js - Initial api call to get user profile and drill down into the credits array.
// const getUserCredits = async user => {
//   try {
//     const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
//     setUserProfile(userProfileFromAPI[0]);
//     console.log(userProfileFromAPI)
//     const rollerCoasterIds = userProfileFromAPI[0].credits.map(credit => {
//       const creditId = credit.rollerCoasterId;
//       return creditId;
//     });
//     let promises = [];
//     rollerCoasterIds.forEach(creditId => {
//       promises.push(ApiManager.getRollerCoastersWithAllExpanded(creditId));
//     });
//     Promise.all(promises).then(data => {
//       setUserCredits(data);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };



// const ProfileList = (props) => {
//     const { user } = useAuth0();
//     const [userCredits, setUserCredits] = useState([]);
//     const [userProfile, setUserProfile] = useState({});
//     const [allCredits, setAllCredits] = useState([]);
  
//     const getUserCredits = async (user) => {
//       try {
//         const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
//         setUserProfile(userProfileFromAPI[0]);
//         const rollerCoasterIds = userProfileFromAPI[0].userprofile.rollerCoaster_id.map(
//           (credit) => {
//             const creditId = credit;
//             return creditId;
//           }
//         );
  
//         let promises = [];
//         rollerCoasterIds.forEach((creditId) => {
//           promises.push(ApiManager.getRollerCoastersWithAllExpanded(creditId));
//         });
//         Promise.all(promises).then((data) => {
//           setUserCredits(data);
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     const deleteCredit = (rollerCoasterId) => {
//       try {
//         confirmAlert({
//           title: "Confirm to delete",
//           message: "Are you sure you want to remove this credit?",
//           buttons: [
//             {
//               label: "Yes",
//               onClick: () => {
//                 ApiManager.getUserProfile(user.email).then((profile) => {
//                   profile = profile[0];
//                   const id = userProfile.userprofile.id;
//                   const filteredCredits = userCredits.filter(
//                     (credit) => credit.id !== rollerCoasterId
//                   );
//                   ApiManager.deleteCredit(id, filteredCredits).then(() => {
//                     getUserCredits(user);
//                   });
//                 });
//               },
//             },
//             {
//               label: "No",
//               onClick: () => "",
//             },
//           ],
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     const getCreditId = async () => {
//       const getCreditIdFromApi = await ApiManager.getCreditIdFromApi();
//       const getProfile = await ApiManager.getUserProfile(user.email);
//       const profile = getProfile[0];
//       let userCredits = [];
//       const filteredCredits = getCreditIdFromApi.filter(
//         (credit) => credit.userProfile === profile.userprofile.id
//       );
//       userCredits.push(filteredCredits);
//       setAllCredits(userCredits);
//     };
  
//     useEffect(() => {
//       getUserCredits(user);
//       getCreditId();
//     }, [user]);
/******************** ***********************************/
/************************ ******************************/

// FROM EDITPROFILE COMPONENT. Not using this api call to get the user credits or the cloudinary function. 

  // const uploadImage = async e => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append("file", files[0]);
  //   data.append("upload_preset", "photoLab");
  //   setIsLoading(true);
  //   const res = await fetch(
  //    // http://localhost:8200/cloudinary://418576712586226:IaXis96Iz93J6NH7PTrU1clKpGM@capstone-project
  //     `https://api.cloudinary.com/v1_1/${keys.cloudinary}/image/upload`,
  //     {
  //       method: "POST",
  //       body: data
  //     }
  //   );
  //   const file = await res.json();
  //   setImage({ picUrl: file.secure_url });
  //   setIsLoading(false);
  // };


  // const getUserCredits = async user => {
  //   try {
  //     const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
  //     setUserProfile(userProfileFromAPI[0]);
  //     const rollerCoasterIds = userProfileFromAPI[0].credits.map(credit => {
  //       const creditId = credit.rollerCoasterId;
  //       return creditId;
  //     });

  //     let promises = [];
  //     rollerCoasterIds.forEach(creditId => {
  //       promises.push(ApiManager.getRollerCoastersWithAllExpanded(creditId));
  //     });
  //     Promise.all(promises).then(data => {
  //       setUserCredits(data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
/************************ ******************************/
/************************ ******************************/

// Get the Credits on the user Edit Form
  //     const creditsMap = filterUsersCredits.map((credit) => {
  //       const rollerCoasterId = credit.rollerCoaster;
  //       return rollerCoasterId;
  //     });
  //     let promises = [];
  //     creditsMap.forEach((item) => {
  //       promises.push(ApiManager.getRollerCoastersForUserProfile(item));
  //     });
  //     Promise.all(promises)
  //       .then((data) => {
  //         setUserCredits(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });


/************************ ******************************/
/************************ ******************************/


// Edit Profile OnDrop Component


  // const onDrop = (picture) => {
  //   setImage({ ...image }, picture);


  // eslint-disable-next-line no-lone-blocks
  {/* <div className="change-profile-pic">
    <label htmlFor="picUrl">Profile picture</label>

    <ImageUploader
      {...props}
      withIcon={true}
      withPreview={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
      className="file-upload"
      id="picUrl"
    />
  </div>
</div> */}

/************************* *************************/
/************************ ******************************/


// Edit profile - this was guards for different combinations of objects to go into database mainly different photo guards.
      // if (picUrl === null) {
      //   const userProfileObject = {
      //     id: profile.id,
      //     address: profile.address,
      //     image: defaultProfilePicture,
      //     credits: profile.credits[0],
      //   };

      //   const apiUserObject = {
      //     id: authProfile.id,
      //     first_name: authProfile.first_name,
      //     last_name: authProfile.last_name,
      //     username: authProfile.username,
      //     email: user.email,

      //   };
      //   setUserProfile(userProfileObject);
      //   setApiUser(apiUserObject)

      // } else if (!picUrl && picture) {
      //   const userProfileObj = {
      //     id: profile.id,
      //     address: profile.address,
      //     image: picture,
      //     rollerCoaster_id: profile.credits[0],
      //   };
      //   const apiUserObject = {
      //     id: authProfile.id,
      //     first_name: authProfile.first_name,
      //     last_name: authProfile.last_name,
      //     username: authProfile.username,
      //     email: user.email,

      //   }
      //   setUserProfile(userProfileObj);
      //   setApiUser(apiUserObject)

      // } else if (picUrl) {
      //   const userProfObj = {
      //     id: profile.id,
      //     address: profile.address,
      //     image: picUrl,
      //     rollerCoaster_id: profile.credits[0],
      //   };
      //   const apiUserObject = {
      //     id: authProfile.id,
      //     first_name: authProfile.first_name,
      //     last_name: authProfile.last_name,
      //     username: authProfile.username,
      //     email: user.email,

      //   };
      //   setUserProfile(userProfObj);
      //   setApiUser(apiUserObject);

      // };

/********************** EDIT CREDIT FORM *******************/
/************************ ******************************/


// import React, { useState, useEffect } from "react";
// import { setResourceStateHelperFunction } from "../../modules/Helpers";
// import "./EditCreditForm.css";

// const EditCreditForm = props => {

//   const [manufacturers, setManufacturers] = useState([]);
//   const [trackTypes, setTrackTypes] = useState([]);
//   const [parks, setParks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [credit, setCredit] = useState({
//     name: "",
//     trackTypeId: "",
//     max_height: "",
//     max_speed: "",
//     parkId: "",
//     manufacturerId: ""
//   });

//   const handleInputChange = e => {
//     const stateToChange = { ...credit };
//     stateToChange[e.target.id] = e.target.value;
//     setCredit(stateToChange);
//   };

//   const updateExistingCredit = e => {
//     e.preventDefault();
//     setIsLoading(true);

//     const editedCredit = {
//       id: props.creditId,
//       name: credit.name,
//       trackTypeId: credit.trackTypeId,
//       max_height: credit.max_height,
//       max_speed: credit.max_speed,
//       parkId: credit.park,
//       manufacturerId: credit.manufacturer
//     };

//     //   ApiManager.updateCredit(editedCredit).then(() =>
//     //     props.history.push("/users")
//     //   );
//     window.alert(
//       "Edit functionality coming soon! Thanks for your patience as we continue to make this app the best it can be!"
//     );
//     props.history.push("/users");
//   };

//   useEffect(() => {
//     setResourceStateHelperFunction(
//       setManufacturers,
//       setTrackTypes,
//       setParks,
//       setIsLoading
//     );
//   }, []);

//   return (
//     <>
//       <div className="back-btn-edit-container">
//         <button
//           className="edit-form-back-button"
//           id="back-arrow-detail"
//           onClick={() => props.history.push("/users")}
//         >
//           BACK
//         </button>
//       </div>
//       <form className="edit-credit-form">
//         <div className="edit-formgrid">
//           <div className="edit-form-fields">
//             <div>
//               <label htmlFor="name">Roller Coaster Name</label>
//               <p>
//                 <textarea
//                   type="text"
//                   rows="2"
//                   cols="80"
//                   required
//                   className="form-control"
//                   onChange={handleInputChange}
//                   id="name"
//                   value={credit.name}
//                 />
//               </p>
//             </div>
//             <div>
//               <label htmlFor="trackType">Track Type</label>
//               <select
//                 className="form-control"
//                 required
//                 id="trackTypeId"
//                 value={credit.trackTypeId}
//                 onChange={handleInputChange}
//               >
//                 {trackTypes.map(trackType => (
//                   <option key={trackType.id}>{trackType.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="max_height">Max Height</label>
//               <p>
//                 <textarea
//                   type="text"
//                   rows="2"
//                   cols="40"
//                   required
//                   className="form-control"
//                   onChange={handleInputChange}
//                   id="max_height"
//                   value={credit.max_height}
//                 />
//               </p>
//             </div>
//             <div>
//               <label htmlFor="max_speed">Max Speed</label>
//               <p>
//                 <textarea
//                   type="text"
//                   rows="2"
//                   cols="40"
//                   required
//                   className="form-control"
//                   onChange={handleInputChange}
//                   id="max_speed"
//                   value={credit.max_speed}
//                 />
//               </p>
//             </div>
//             <div>
//               <label htmlFor="parkId">Park Name</label>
//               <p>
//                 <select
//                   required
//                   className="form-control"
//                   onChange={handleInputChange}
//                   id="parkId"
//                   value={credit.parkId}
//                 >
//                   {parks.map(park => (
//                     <option key={park.id}>{park.name}</option>
//                   ))}
//                 </select>
//               </p>
//             </div>
//             <div>
//               <label htmlFor="manufacturerId">Manufacturer</label>
//               <select
//                 className="form-control"
//                 required
//                 id="manufacturerId"
//                 value={credit.manufacturerId}
//                 onChange={handleInputChange}
//               >
//                 {manufacturers.map(manufacturer => (
//                   <option key={manufacturer.id}>{manufacturer.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="edit-alignRight">
//             <button
//               type="button"
//               disabled={isLoading}
//               onClick={updateExistingCredit}
//               id="editCreditFormBtn"
//               className="ui blue basic button"
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default EditCreditForm;

/******************************** RollerCoasterList ******************/
/************************ ******************************/


  // const { user } = useAuth0();
  // const [rollerCoasters, setRollerCoasters] = useState([]);
  // const [userProfile, setUserProfile] = useState([]);
  // const [authUser, setAuthUser] = useState([]);
  // const [credits, setCredits] = useState([]);

  // function to populate entire list of rollerCoasters in database
  // const rollerCoastersFromAPI = async () => {
  //   const rollerCoastersData = await rollerCoasterManager.getAllRollerCoastersWithAllExpanded();
  //   setRollerCoasters(rollerCoastersData);
  // };


  // Grabbing the current user profile and drilling into credits [array] to determine how many/ what credits they have. Will determine on initial render if add button is shown.
  // const currentUserProfileCredits = async (user) => {
  //   const getAuthUser = await userManager.getAuthUser(user.email);
  //   setAuthUser(getAuthUser[0]);
  //   const authUserId = getAuthUser[0].id;
  //   const getProfile = await userManager.getUserProfileEmbeddedAuthUser(
  //     authUserId
  //   );
  //   const profile = getProfile[0];
  //   const creditsArray = profile.credits;
  //   setUserProfile(profile);
  //   setCredits(creditsArray);
  // };

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

/****************************** ***********************/
/************************ ******************************/
