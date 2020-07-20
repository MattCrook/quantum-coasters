import React from "react";
import ParkList from "./RollerCoasterList";
import "./NewCreditForm.css";
import CustomizedInputBase from "../search/CustomizedInputBase";

// return ParkList component when user clicks the "add new credit button" on {ProfileList}...
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
          <div className="search-bar-container">
            <CustomizedInputBase />
          </div>
        </div>
        <button
          type="button"
          className="add-new-ride-btn"
          onClick={() => props.history.push("/new/rollercoaster")}
        >Create New Roller Coaster<i className="fas fa-database"></i></button>
      </section>

      <div className="rollerCoaster-list-to-add-credits">
        <ParkList authUser={authUser} userProfile={userProfile} {...props} />
      </div>
    </>
  );
};

export default AddNewCreditForm;
