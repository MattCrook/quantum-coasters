import React from "react";
import RollerCoasterList from "./RollerCoasterList";
import "./NewCreditForm.css";
import CustomizedInputBase from "../search/CustomizedInputBase";

// return RollerCoasterList component when user clicks the "add new credit button" on {ProfileList}...
const AddNewCreditForm = (props) => {
  const { authUser } = props;
  const { userProfile } = props;

  return (
    <>
      <section className="ride-not-found-section">
        <div className="banner-container">
          <h3 className="banner">
            Don't see the ride you are looking for? Click below and help us add
            to our repertoire!
          </h3>
          <div className='search-bar-container'>
            <CustomizedInputBase />
          </div>
        </div>
        <button
          type="button"
          className="add-new-ride-btn"
          onClick={() => props.history.push("/new/rollercoaster")}
        >
          Create New Roller Coaster
        </button>
      </section>

      {/* <div className="back-btn-newCredit-container">
        <button
          className="newCredit-form-back-button"
          id="back-arrow-detail"
          onClick={() => props.history.push("/users")}
        >
          BACK
        </button>
      </div> */}
      <div className="rollerCoaster-list-to-add-credits">
        <RollerCoasterList authUser={authUser} userProfile={userProfile} {...props} />
      </div>
    </>
  );
};

export default AddNewCreditForm;
