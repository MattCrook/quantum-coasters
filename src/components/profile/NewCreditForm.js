import React from "react";
import RollerCoasterList from "./RollerCoasterList";
import "./NewCreditForm.css";


// return RollerCoasterList component when user clicks the "add new credit button" on {ProfileList}...
const AddNewCreditForm = props => {
  return (
    <>
      <section className="ride-not-found-section">
        <h3 className="banner">
          Don't see the information to fill out the form? Click below and help
          us add to our repertoire!
        </h3>
        <button
          type="button"
          className="add-new-ride-btn"
          onClick={() => props.history.push("/new/rollercoaster")}
        >
          Create New Roller Coaster
        </button>
      </section>

      <div className="back-btn-newCredit-container">
        <button
          className="newCredit-form-back-button"
          id="back-arrow-detail"
          onClick={() => props.history.push("/users")}
        >
          BACK
        </button>
      </div>
      <div className="rollerCoaster-list-to-add-credits">
        <RollerCoasterList
          {...props}
        />
      </div>
    </>
  );
};

export default AddNewCreditForm;
