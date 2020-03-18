import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

const AddNewRollerCoaster = () => {
  const { loading, user, history } = useAuth0();

  // set initial state of form to empty
  const [rollerCoaster, setRollerCoaster] = useState({
    name: "",
    trackType: "",
    max_height: "",
    max_speed: "",
    park: "",
    manufacturer: "",
    userId: ""
  });

  // handle what user is typing in
  const handleFieldChange = e => {
    const stateToChange = { ...rollerCoaster };
    stateToChange[e.target.id] = e.target.value;
    setRollerCoaster(stateToChange);
  };

  // object to go into database
  const constructNewRollerCoaster = e => {
    e.preventDefault();
    e.stopPropagation();

    const newRollerCoaster = {
      name: rollerCoaster.name,
      trackType: rollerCoaster.trackType,
      max_height: rollerCoaster.max_height,
      max_speed: rollerCoaster.max_speed,
      park: rollerCoaster.park,
      manufacturer: rollerCoaster.manufacturer,
      userId: user.id
    };

    // guard to make sure all fields are filled out
    if (
      rollerCoaster.name === "" ||
      rollerCoaster.trackType === "" ||
      rollerCoaster.max_height === "" ||
      rollerCoaster.max_speed === "" ||
      rollerCoaster.manufacturer === "" ||
      rollerCoaster.park === ""
    ) {
      alert("Please fill out all fields in form");
    } else {
      !loading &&
        ApiManager.postNewRollerCoaster(newRollerCoaster).then(() =>
          history.push("/profile")
        );
    }
  };

  return (
    <form className="main-form" onSubmit={constructNewRollerCoaster}>
      <fieldset className="fs-form">
        <h3 className="title">Input Ride Details</h3>
        <div className="create-form">
          <label htmlFor="inputName">Roller Coaster Name</label>
          <input
            className="input"
            onChange={handleFieldChange}
            type="name"
            id="name"
            placeholder="Enter Roller Coaster Name"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputTrackType">Track Type</label>
          <input
            className="input"
            onChange={handleFieldChange}
            type="dropdown"
            id="trackType"
            placeholder="Select Track Type"
            required=""
            autoFocus=""
          />

          <label htmlFor="inputPassword">Max Height</label>
          <input
            className="input"
            onChange={handleFieldChange}
            type="text"
            id="max_height"
            placeholder="Max Height"
            required=""
            autoFocus=""
          />
          <label htmlFor="confirm-password">Max Speed</label>
          <input
            className="input"
            onChange={handleFieldChange}
            type="text"
            id="max_speed"
            placeholder="Max Speed"
            required=""
            autoFocus=""
          />
          <label htmlFor="confirm-password">Home Park</label>
          <input
            className="input"
            onChange={handleFieldChange}
            type="text"
            id="park"
            placeholder="Enter Home Park Of Ride"
            required=""
            autoFocus=""
          />
          <input
            className="input"
            onChange={handleFieldChange}
            type="dropdown"
            id="park"
            placeholder="Select Manufacturer"
            required=""
            autoFocus=""
          />
          <button className="create-btn" type="submit">
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
};
