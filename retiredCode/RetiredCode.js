// This is a folder of most the old code which was removed during the Refactor from using Json server, to uing my own custom built API

const { Form } = require("semantic-ui-react")


/******************** ***********************************/

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

// Edit Profile OnDrop Component


  // const onDrop = (picture) => {
  //   setImage({ ...image }, picture);


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
