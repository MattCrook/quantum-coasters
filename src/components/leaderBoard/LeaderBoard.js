import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
// import "./Profile.css";

const LeaderBoard = props => {
  console.log({ props });
  //   const [userCredits, setRollerCoasters] = useState([]);
  //   const [userProfile, setUserProfile] = useState({});
  const [profiles, setProfiles] = useState([]);

  const getAllUsers = async () => {
    try {
      const userProfiles = await ApiManager.getAllUsers();
      setProfiles(getAllUsers);
      const creditsArray = userProfiles.map(profile => {
        return {
          firstName: profile.first_name,
          creditCount: profile.credits.map(credit => {
            return credit.rollerCoasterId;
          })
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log({ profiles });

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div>HI </div>
      <nav className="navbar is-dark">
        <div className="container">
          <button
            className="navbar-item"
            onClick={() => props.history.push("/home")}
          >
            Quantum
          </button>
          {profiles.map(profile => (
            <p className="name">
              {profile.first_name} {profile.last_name}
              {profile.picUrl ? (
                <img id="profile-pic" src={profile.picUrl} alt="My Avatar" />
              ) : (
                <img id="profile-pic" src={profile.picture} alt="My Avatar" />
              )}
            </p>
          ))}
        </div>
      </nav>
      <button
        className="profile-back-btn"
        onClick={() => props.history.push("/home")}
      >
        Back
      </button>
      <p className="credits-title">
        <strong>LeaderBoard</strong>
      </p>
    </>
  );
};

export default LeaderBoard;

// const creditsArray = creditsArray.map(profile => {
//     const profileNames = profile.first_name;
//     const profileCreditsArray = profile.credits;
//     console.log(profileCreditsArray)
// });
//     let newArray = [];
//     creditsArray.forEach(name => {
//         newArray.push(name)
//     });
//     console.log("newArray", newArray)

/************** **********/

// let creditsMap = new Map([]);
// creditsArray.forEach(function(key, value) {
// creditsMap.set(credit);
// console.log("creditsMap", creditsMap)
// console.log(myMap)
// console.log("credits", credits)
// let usersCredits = [];

//   const mySet = new Set(getAllUsersFetch);
//   console.log("mySet", mySet);
//   const credits = getAllUsersFetch.credits;
//   console.log("credits", credits)

//   const rollerCoasterCredits = getAllUsersFetch.credits.map(credit => {
//       console.log("credit", credit)
// });

/*********** *****************/

// const getAllUsersCredits = async () => {
//     try {
//       const getAllUsersFetch = await ApiManager.getAllUsers();
//       setProfiles(getAllUsersFetch);
//     const creditsArray = getAllUsersFetch.map(profile => {
//         const credits = profile.credits;
//         return credits;
//     });
//     const creditMap = new Map(...creditsArray.map(i => [i.key, i.value]));
//     console.log("creditsMap", ...creditMap)

//     // let newArrayCredits = [];
//     // creditsArray.forEach(credit => {
//         //     newArrayCredits.push(credit)
//         // });
//         } catch (error) {
//             console.log(error);
//         }
//     };
