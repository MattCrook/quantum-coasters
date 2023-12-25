import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ProfileCard from "./pages/ProfileCard";
import userManager from "../../modules/users/userManager";
import creditManager from "../../modules/credits/creditManager";
import rollerCoasterManager from "../../modules/rollerCoasters/rollerCoasterManager";
import { postFeedback, postBugReport } from "../../modules/services/services";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import UserCreditsByPark from "./profileCredits/CreditsListByPark";
import UserCreditsByRide from "./profileCredits/UserCreditsByRide";
import { confirmAlert } from "react-confirm-alert";
import DefaultView from "./pages/DefaultView";
import SearchBarLight from "../search/ProfileListSearch";
import FeedbackModal from "../modals/FeedbackModal";
import BugReportModal from "../modals/BugModal";
import "./Profile.css";
import "react-confirm-alert/src/react-confirm-alert.css";


const ProfileList = (props) => {
  const defaultProfilePicture = "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg";
  const { clearStorage, logout, djangoRestAuthLogout } = useAuth0();
  const { authUser, userProfile, userCredits } = useAuthUser();
  const { postNewErrorLog } = useErrorLog();
  const { postActivityLogAddCredit, postActivityLogEditProfile, postFeedbackActivityLog, postBugReportActivityLog } = useActivityLog();
  const [userRollerCoasters, setUserRollerCoasters] = useState([]);
  const [visitedParks, setVisitedParks] = useState([]);
  const [whichTab, setWhichTab] = useState("settings--allCredits");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [searchOutput, setSearchOutput] = useState([]);
  const [defaultSectionContent, setDefaultSectionContent] = useState([]);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const feedbackComment = useRef();
  const feedbackSubject = useRef();
  const bugTitle = useRef();
  const bugDescription = useRef();
  const allCreditsRef = useRef();
  const userId = authUser.id;


  const toggleProfileDropdown = () => setIsProfileDropdown(!isProfileDropdown);
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
  }

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

  const handleOpenFeedBack = () => {
    setFeedbackModalOpen(true);
  };

  const handleCloseFeedBack = () => {
    setFeedbackModalOpen(false);
  };

  const handleOpenBugReport = () => {
    setBugReportModalOpen(true);
  };

  const handleCloseBugReport = () => {
    setBugReportModalOpen(false);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const feedback = {
      subject: feedbackSubject.current.value,
      comment: feedbackComment.current.value,
    };
    postFeedback(feedback)
      .then(() => {
        alert("Thanks for your feedback! Your submission has been received.");
        postFeedbackActivityLog(e, props, authUser.id, "ProfileList.js", "FeedbackModal.js").then(() => {
          setFeedbackModalOpen(false);
          setIsProfileDropdown(false);
        })
          .catch((error) => {
            postNewErrorLog(error, "ProfileList.js", "postFeedback");
        })
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "ProfileList.js", "handleSubmitFeedback");
      });
  };

  const handleSubmitBug = async (e) => {
    e.preventDefault();
    const bug = {
      title: bugTitle.current.value,
      description: bugDescription.current.value,
    };
    try {
      await postBugReport(bug);
      alert("Thanks for finding a bug! Your submission has been received.");
    } catch (error) {
      await postNewErrorLog(error, "ProfileList.js", "handleSubmitBug");
      alert("Oops! Something went wrong. Please contact support for help.");
    }

    await postBugReportActivityLog(e, props, authUser.id, "ProfileList.js", "BugModal.js");
    setBugReportModalOpen(false);
    setIsProfileDropdown(false);
  };


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
          <div className="name-profile-list">
            {authUser.first_name} {authUser.last_name}
          </div>
          <button onClick={() => toggleProfileDropdown()}>
            {userProfile.image ? (
              <img id="profile-pic-profile-list" src={userProfile.image.image} alt="My Avatar" />
            ) : (
              <img id="profile-pic-profile-list" src={defaultProfilePicture} alt="My Avatar" />
            )}
          </button>
          <button
            id="profile_list_logout_btn"
            onClick={() => djangoRestAuthLogout(logout, clearStorage, authUser)}
            // onClick={() => logout({ returnTo: window.location.origin }, clearStorage())}
            className="logout-navbar-item-profile-list"
            data-testid="logout-btn-testid"
          >
            Logout
          </button>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </nav>

      {isProfileDropdown ? (
        <div className="nav_profile_dropdown_container">
          <>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => props.history.push("/home")}>
                Home
              </div>
              {/* <i className="fas fa-long-arrow-alt-right"></i> */}
              <i className="fas fa-home"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => props.history.push(`/profile/${authUser.id}`)}>
                Edit Account
              </div>
              <i className="fas fa-user-edit"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => handleOpenFeedBack()}>
                Give Feedback
              </div>
              <i className="far fa-comments"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => handleOpenBugReport()}>
                Report a Bug
              </div>
              <i className="fas fa-bug"></i>
            </div>
          </>
        </div>
      ) : null}
      <FeedbackModal
        authUser={authUser}
        feedbackModalOpen={feedbackModalOpen}
        handleOpenFeedBack={handleOpenFeedBack}
        handleCloseFeedBack={handleCloseFeedBack}
        feedbackComment={feedbackComment}
        feedbackSubject={feedbackSubject}
        handleSubmitFeedback={handleSubmitFeedback}
        {...props}
      />
      <BugReportModal
        bugReportModalOpen={bugReportModalOpen}
        handleOpenBugReport={handleOpenBugReport}
        handleCloseBugReport={handleCloseBugReport}
        bugDescription={bugDescription}
        bugTitle={bugTitle}
        handleSubmitBug={handleSubmitBug}
        {...props}
      />

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
          <SearchBarLight
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
        <div className="total_credits_profile_list">Total Credits: {props.userProfile.credits.length}</div>
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
