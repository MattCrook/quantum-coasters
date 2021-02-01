import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "../../../contexts/react-auth0-context";
import ParkList from "./RollerCoasterList";
import CustomizedInputBase from "../../search/CustomizedInputBase";
import parkManager from "../../../modules/parks/parkManager";
import { useActivityLog } from "../../../contexts/ActivityLogContext";
import { useErrorLog } from "../../../contexts/ErrorLogContext";
import FeedbackModal from "../../modals/FeedbackModal";
import BugReportModal from "../../modals/BugModal";
import { postBugReport, postFeedback } from "../../../modules/services/services";
import "../styles/NewCreditForm.css";



// return ParkList component when user clicks the "add new credit button" on {ProfileList}...
const AddNewCreditForm = (props) => {
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
  const { loading, user, isAuthenticated } = useAuth0();
  const { postActivityLogCreateRollerCoster, postFeedbackActivityLog, postBugReportActivityLog } = useActivityLog();
  const { postNewErrorLog } = useErrorLog();
  const { authUser } = props;
  const { userProfile } = props;
  const [parks, setParks] = useState([]);
  const [allParks, setAllParks] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const feedbackComment = useRef();
  const feedbackSubject = useRef();
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const bugTitle = useRef();
  const bugDescription = useRef();
  const toggleProfileDropdown = () => setIsProfileDropdown(!isProfileDropdown);

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
        postFeedbackActivityLog(e, props, authUser.id, "NewCreditForm.js", "FeedbackModal.js").then(() => {
          setFeedbackModalOpen(false);
          setIsProfileDropdown(false);
        });
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "NewCreditForm.js", "handleSubmitFeedback");
      });
  };

  const handleSubmitBug = (e) => {
    e.preventDefault();
    const bug = {
      title: bugTitle.current.value,
      description: bugDescription.current.value,
    };
    postBugReport(bug)
      .then(() => {
        alert("Thanks for your feedback! Your submission has been received.");
        postBugReportActivityLog(e, props, authUser.id, "NewCreditForm.js", "BugModal.js").then(() => {
          setBugReportModalOpen(false);
          setIsProfileDropdown(false);
        });
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "NewCreditForm.js", "handleSubmitBug");
      });
  };

  const handleSearchInput = (e) => {
    let state = { ...searchInput };
    state = e.target.value;
    setSearchInput(state);
    handleSearch(state);
  };

  const handleSearch = (state) => {
    const filteredParks = parks.filter((park) => {
      return park.name.toLowerCase().includes(state.toLowerCase());
    });
    setParks(filteredParks);
    return filteredParks;
  };

  useEffect(() => {
    const parksFromAPI = async () => {
      const getAllParks = await parkManager.getParks();
      setParks(getAllParks);
      setAllParks(getAllParks);
    };
    parksFromAPI();
  }, []);

  return (
    <>
      <section className="ride-not-found-section">
        <div className="banner-container">
          <div className="add_credit_banner">Add New Credit</div>
          <div className="search-bar-container">
            <CustomizedInputBase
              handleSearchInput={handleSearchInput}
              allParks={allParks}
              setParks={setParks}
              {...props}
            />
          </div>

          <div className="add_new_credit_nav_profile_pic_container">
            <div id="navbar_end" className="navbar-end">
              {isAuthenticated && authUser && authUser.email ? (
                <div className="navbar-item-home-name">
                  {authUser.first_name} {authUser.last_name}
                </div>
              ) : (
                <div className="navbar_item_home_user_name">{user.email}</div>
              )}
            </div>
            <button className="nav_profile_dropdown" onClick={() => toggleProfileDropdown()}>
              {!loading && userProfile.image ? (
                <img
                  data-testid="add-new-credit-profile-pic-testid"
                  id="nav-profile-pic-add-new-credit"
                  src={userProfile.image.image}
                  alt="My Avatar"
                />
              ) : (
                <img
                  data-testid="add-new-credit-profile-pic-testid"
                  id="nav-profile-pic-add-new-credit"
                  src={defaultProfilePicture}
                  alt="My Avatar"
                />
              )}
            </button>
          </div>
        </div>
        {isProfileDropdown ? (
          <div className="nav_profile_dropdown_container">
            <>
              <div className="nav_profile_dropdown_row">
                <div className="nav_profile_dropdown_item" onClick={() => props.history.push("/user/profile/credits")}>
                  Back to Profile
                </div>
                <i className="fas fa-long-arrow-alt-right"></i>
              </div>
              <div className="nav_profile_dropdown_row">
                <div className="nav_profile_dropdown_item" onClick={() => props.history.push("/home")}>
                  Home
                </div>
                <i className="fas fa-home"></i>
              </div>
              <div className="nav_profile_dropdown_row">
                <div
                  className="nav_profile_dropdown_item"
                  onClick={() => props.history.push(`/profile/${authUser.id}`)}
                >
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
        <div className="create_new_rc_side_nav">
          <button
            type="button"
            className="add-new-ride-btn"
            onClick={(e) => postActivityLogCreateRollerCoster(e, props, authUser.id, "/new/rollercoaster")}
          >
            Create New Roller Coaster
          </button>
          <button
            type="button"
            className="add_new_ride_btn_bulk_upload"
            onClick={() => props.history.push("/parks")}
            // onClick={(e) => postActivityLogCreateRollerCoster(e, props, authUser.id, "/new/rollercoaster")}
          >
            Submit Bulk Upload to Park
          </button>
        </div>
      </section>
      <div className="banner">
        <i className="fas fa-info-circle"></i>Don't see the ride you are looking for? Select either Create new or Submit
        Bulk Upload to help us add to our repertoire!
      </div>

      <div className="rollerCoaster-list-to-add-credits">
        <ParkList parks={parks} authUser={authUser} userProfile={userProfile} {...props} />
      </div>
    </>
  );
};

export default AddNewCreditForm;
