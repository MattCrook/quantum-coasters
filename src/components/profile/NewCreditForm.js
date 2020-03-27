import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { formatInput } from "../../modules/Helpers";
import RollerCoasterList from "./RollerCoasterList";
import "./NewCreditForm.css";

// return roller coaster list when user clicks the "add new credit button" on {ProfileList}...
// Have a form on this page too? Or keep the button to take user to create new DB entry...

const AddNewCreditForm = props => {
  // const { user } = useAuth0();
  // const [userProfile, setUserProfile] = useState({});
  // const [credits, setCredits] = useState([]);


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
      {/* <form className="newCredit-credit-form">
        <div className="edit-credit-icon-container">
          <i
            className="big arrow circle left icon"
            id="back-arrow-detail"
            onClick={() => props.history.push("/users")}
          ></i>
        </div>
        <div className="newCredit-formgrid">
          <div className="newCredit-form-fields">
            <div>
              <label htmlFor="name">Roller Coaster Name</label>
              <p>
                <select
                  type="text"
                  rows="2"
                  cols="80"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="name"
                  value={credit.name}
                ></select>
              </p>
            </div>
            <div>
              <label htmlFor="trackType">Track Type</label>
              <select
                className="form-control"
                required
                id="trackTypeId"
                value={credit.trackTypeId}
                onChange={handleFieldChange}
              >
                {trackTypes.map(trackType => (
                  <option key={trackType.id} value={trackType.id}>
                    {trackType.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="max_height">Max Height</label>
              <p>
                <textarea
                  type="text"
                  rows="2"
                  cols="40"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="max_height"
                  value={credit.max_height}
                />
              </p>
            </div>
            <div>
              <label htmlFor="max_speed">Max Speed</label>
              <p>
                <textarea
                  type="text"
                  rows="2"
                  cols="40"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="max_speed"
                  value={credit.max_speed}
                />
              </p>
            </div>
            <div>
              <label htmlFor="parkId">Park Name</label>
              <p>
                <select
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="parkId"
                  value={credit.parkId}
                >
                  {parks.map(park => (
                    <option key={park.id} value={park.id}>
                      {park.name}
                    </option>
                  ))}
                </select>
              </p>
            </div>
            <div>
              <label htmlFor="manufacturerId">Manufacturer</label>
              <select
                className="form-control"
                required
                id="manufacturerId"
                value={credit.manufacturerId}
                onChange={handleFieldChange}
              >
                {manufacturers.map(manufacturer => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="newCredit-submit">
            <button
              type="button"
              disabled={isLoading}
              onClick={createNewCredit}
              id="editCreditFormBtn"
              className="ui blue basic button"
            >
              Submit
            </button>
          </div>
        </div>
      </form> */}
    </>
  );
};

export default AddNewCreditForm;
