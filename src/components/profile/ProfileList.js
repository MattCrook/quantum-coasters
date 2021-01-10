import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ProfileCard from "./pages/ProfileCard";
import userManager from "../../modules/users/userManager";
import creditManager from "../../modules/credits/creditManager";
import rollerCoasterManager from "../../modules/rollerCoasters/rollerCoasterManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import UserCreditsByPark from "./profileCredits/CreditsListByPark";
import UserCreditsByRide from "./profileCredits/UserCreditsByRide";
import { confirmAlert } from "react-confirm-alert";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import DefaultView from "./pages/DefaultView";
import ProfileListSearch from "../search/ProfileListSearch";
import "./Profile.css";
import "react-confirm-alert/src/react-confirm-alert.css";

const ProfileList = (props) => {
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
  const { clearStorage, logout } = useAuth0();
  const { authUser, userProfile, userCredits } = useAuthUser();
  const { postNewErrorLog } = useErrorLog();
  const { postActivityLogAddCredit, postActivityLogEditProfile } = useActivityLog();
  const [userRollerCoasters, setUserRollerCoasters] = useState([]);
  const [visitedParks, setVisitedParks] = useState([]);
  const [whichTab, setWhichTab] = useState("settings--allCredits");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [searchOutput, setSearchOutput] = useState([]);
  const [defaultSectionContent, setDefaultSectionContent] = useState([]);
  const userId = authUser.id;
  const allCreditsRef = useRef();

  const isActive = (ref) => ref.current.classList.add("active");

  const defaultSideNavToggle = useCallback((ref) => {
    isActive(ref);
  }, []);

  const allUserCredits = async (userCredits) => {
    try {
      const creditsMap = userCredits.map((credit) => {
        const rollerCoasterId = credit.rollerCoaster;
        return rollerCoasterId;
      });
      return creditsMap;
    } catch (error) {
      console.log(error);
    }
  };

  const rollerCoastersFromUserCredits = useCallback(
    async (userCredits) => {
      try {
        const allUserRollerCoasters = await allUserCredits(userCredits);
        let promises = [];
        allUserRollerCoasters.forEach((rollerCoasterId) => {
          promises.push(rollerCoasterManager.getRollerCoastersForUserProfile(rollerCoasterId));
        });
        const data = await Promise.all(promises);
        setUserRollerCoasters(data);
        setDefaultSectionContent(data);
        let parks = new Set();
        data.forEach((ride) => {
          const park = ride.park;
          parks.add(park.name);
        });
        setVisitedParks([...parks]);
      } catch (err) {
        postNewErrorLog(err, "ProfileList", "getUserCreditsToFetch");
        console.log(err);
      }
    },
    [postNewErrorLog]
  );

  const deleteCredit = (creditId) => {
    try {
      confirmAlert({
        title: "Confirm to delete",
        message: "Are you sure you want to remove this credit?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              setIsLoading(true);
              creditManager
                .getCreditIdFromApi()
                .then((credits) => {
                  const filteredCreditToDelete = credits.filter((credit) => credit.rollerCoaster === creditId);
                  creditManager
                    .deleteCredit(filteredCreditToDelete[0].id)
                    .then(() => {
                      userManager.getUserProfileEmbeddedAuthUser(userId).then(() => {
                        rollerCoastersFromUserCredits(userId);
                      });
                    })
                    .catch((error) => {
                      console.log({ error });
                      postNewErrorLog(error, "ProfileList", "deleteCredit");
                    });
                })
                .catch((error) => {
                  console.log({ error });
                  postNewErrorLog(error, "ProfileList", "deleteCredit");
                });
              setIsLoading(false);
            },
          },
          {
            label: "No",
            onClick: () => "",
          },
        ],
      });
    } catch (error) {
      console.log({ error });
      postNewErrorLog(error, "ProfileList", "deleteCredit");
    }
  };

  const handleToggle = (e) => {
    setIsLoading(true);
    const allCredits = document.getElementById("settings--allCredits");
    const allCreditsAndDetails = document.getElementById("settings--allCreditsAndDetails");
    const creditsByRide = document.getElementById("settings--rollercoaster");
    const creditsByPark = document.getElementById("last_btn_link_settings");

    allCredits.classList.remove("active");
    allCreditsAndDetails.classList.remove("active");
    creditsByRide.classList.remove("active");
    creditsByPark.classList.remove("active");

    e.target.classList.add("active");
    setWhichTab(e.target.id);
    setIsLoading(false);
  };

  function searchHandler(e) {
    let inputStateToChange = { ...searchInput };
    inputStateToChange = e.target.value;
    setSearchInput(inputStateToChange);
    filterSearchList(inputStateToChange);
  };

  function filterSearchList(inputValue) {
    const stateShallowCopy = [...userRollerCoasters];
    const filteredResults = stateShallowCopy.filter((result) => {
      return result.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setUserRollerCoasters(filteredResults);
    setSearchOutput(filteredResults);
    return filteredResults;
  }

  useMemo(() => {
    if (props) {
      rollerCoastersFromUserCredits(userCredits);
    }
  }, [props, rollerCoastersFromUserCredits, userCredits]);

  useEffect(() => defaultSideNavToggle(allCreditsRef), [defaultSideNavToggle]);

  return (
    <>
      <nav id="nav_profile_list_container" className="navbar is-dark">
        <div className="navbar-brand">
          <button id="quantum_logo" className="navbar-item">
            Quantum Coasters
          </button>
        </div>

        <button
          id="add-new-credit-btn "
          className="add-new-credit-btn inset"
          data-testid="add_new_credit_btn_testid"
          onClick={(e) => postActivityLogAddCredit(e, props, authUser.id, "/user/parks/addcredit")}
        >
          Add New Credit
        </button>

        <button
          id="edit-profile-button"
          className="edit-profile-button inset"
          data-testid="edit_profile_btn_testid"
          onClick={(e) => postActivityLogEditProfile(e, props, authUser.id, `/profile/${userProfile.id}`)}
        >
          Edit Profile
        </button>

        <div className="name-container-profile-list">
          <p className="name-profile-list">
            {authUser.first_name} {authUser.last_name}
          </p>
          {userProfile.image ? (
            <img id="profile-pic-profile-list" src={userProfile.image.image} alt="My Avatar" />
          ) : (
            <img id="profile-pic-profile-list" src={defaultProfilePicture} alt="My Avatar" />
          )}
          <button
            id="profile_list_logout_btn"
            onClick={() => logout({ returnTo: window.location.origin }, clearStorage())}
            className="logout-navbar-item-profile-list"
            data-testid="logout-btn-testid"
          >
            Logout
          </button>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </nav>

      <div className="setting_side_nav">
        <div className="settings_links_containers">
          <div
            id="settings--allCredits"
            className="settings_link_button"
            onClick={(e) => handleToggle(e)}
            ref={allCreditsRef}
          >
            All Credits
          </div>
          <div id="settings--allCreditsAndDetails" className="settings_link_button" onClick={(e) => handleToggle(e)}>
            All Credits and Details
          </div>
          <div id="settings--rollercoaster" className="settings_link_button" onClick={(e) => handleToggle(e)}>
            Credits by Rollercoaster
          </div>
          <div className="settings_link_button" id="last_btn_link_settings" onClick={(e) => handleToggle(e)}>
            Credits By Park
          </div>
          <ProfileListSearch
            searchHandler={searchHandler}
            defaultSectionContent={defaultSectionContent}
            setSearchOutput={setSearchOutput}
            setUserRollerCoasters={setUserRollerCoasters}
            searchInput={searchInput}
            {...props}
          />
        </div>
      </div>
      <div className="credits-title">Quantum Credits</div>
      <div className="total_credits_header_profile_list">
        <div className="total_credits_profile_list">Total Credits: {props.userCredits.length}</div>
        <div className="total_credits_profile_list">Total Parks Visited: {visitedParks.length}</div>
      </div>

      {whichTab === "settings--allCredits" && (
        <div className="default_view_profile_list">
          {userRollerCoasters.map((rollerCoaster) => (
            <DefaultView
              key={rollerCoaster.id}
              userProfile={props.userProfile}
              authUser={authUser}
              rollerCoaster={rollerCoaster}
              park={rollerCoaster.park}
              {...props}
            />
          ))}
        </div>
      )}

      {whichTab === "settings--allCreditsAndDetails" && (
        <div className="profile-container-card" data-testid="profile_card_container_testid">
          {userRollerCoasters.map((rollerCoaster) => (
            <ProfileCard
              key={rollerCoaster.id}
              userProfile={props.userProfile}
              authUser={authUser}
              rollerCoaster={rollerCoaster}
              manufacturer={rollerCoaster.manufacturer}
              park={rollerCoaster.park}
              trackType={rollerCoaster.tracktype}
              deleteCredit={deleteCredit}
              {...props}
            />
          ))}
        </div>
      )}
      {whichTab === "settings--rollercoaster" && (
        <div className="profile-container-card" data-testid="profile_card_container_testid">
          <UserCreditsByRide userRollerCoasters={userRollerCoasters} deleteCredit={deleteCredit} {...props} />
        </div>
      )}

      {whichTab === "last_btn_link_settings" && (
        <div className="profile-container-credits-by-park" data-testid="profile_card_container_testid">
          <UserCreditsByPark userRollerCoasters={userRollerCoasters} {...props} />
        </div>
      )}
    </>
  );
};

export default ProfileList;
