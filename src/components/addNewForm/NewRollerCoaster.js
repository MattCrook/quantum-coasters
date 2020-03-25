import React, { useState } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";

import "./NewRollerCoasterForm.css";
const AddNewRollerCoaster = props => {
  console.log(props);
  const [IsLoading, setIsLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState({
    name: "",
    origin_country: "",
    manufacture_url: ""
  });

  const [trackType, setTrackType] = useState({ name: "" });

  const [park, setPark] = useState({
    name: "",
    parkLocation: "",
    parkCountry: ""
  });

  // set initial state of form to empty
  const [rollerCoaster, setRollerCoaster] = useState({
    name: "",
    trackTypeId: "",
    max_height: "",
    max_speed: "",
    manufacturerId: "",
    parkId: ""
  });

  // handle what user is typing in
  const handleRollerCoasterFieldChange = e => {
    const stateToChange = { ...rollerCoaster };
    stateToChange[e.target.id] = e.target.value;
    setRollerCoaster(stateToChange);
  };

  const handleParkFieldChange = e => {
    const stateToChange = { ...park };
    stateToChange[e.target.id] = e.target.value;
    setPark(stateToChange);
  };

  const handleManufacturerFieldChange = e => {
    const stateToChange = { ...manufacturer };
    stateToChange[e.target.id] = e.target.value;
    setManufacturer(stateToChange);
  };

  const handleTrackTypeFieldChange = e => {
    const stateToChange = { ...trackType };
    stateToChange[e.target.id] = e.target.value;
    setTrackType(stateToChange);
  };

  // object to go into database
  const constructNewRollerCoaster = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    const newPark = {
      name: park.name,
      parkLocation: park.parkLocation,
      parkCountry: park.parkCountry
    };

    const newManufacturer = {
      name: manufacturer.name,
      origin_country: manufacturer.origin_country,
      manufacture_url: manufacturer.manufacture_url
    };

    const newTrackType = {
      name: trackType.name
    };

    // guard to make sure all fields are filled out
    if (
      rollerCoaster.name === "" ||
      rollerCoaster.max_height === "" ||
      rollerCoaster.max_speed === "" ||
      trackType.name === "" ||
      park.name === "" ||
      park.parkLocation === "" ||
      park.parkCountry === "" ||
      manufacturer.name === "" ||
      manufacturer.origin_country === "" ||
      manufacturer.manufacture_url === ""
    ) {
      alert("Please fill out all fields in form");
    } else {
      // setIsLoading(true);
      confirmAlert({
        title: "Confirm Roller Coaster Data Submission",
        message: "Confirm",
        buttons: [
          {
            label: "Yes",
            onClick: () =>
              ApiManager.postNewTrackType(newTrackType).then(({ id }) => {
                const trackTypeId = id;
                ApiManager.postNewPark(newPark).then(({ id }) => {
                  const parkId = id;
                  ApiManager.postNewManufacturer(newManufacturer).then(({ id }) => {
                      const manufacturerId = id;
                      const newRollerCoaster = {
                        name: rollerCoaster.name,
                        trackTypeId: trackTypeId,
                        max_height: rollerCoaster.max_height,
                        max_speed: rollerCoaster.max_speed,
                        parkId: parkId,
                        manufacturerId: manufacturerId
                      };
                      ApiManager.postNewRollerCoaster(newRollerCoaster).then(() =>
                      props.history.push("/users/new"));
                    }
                  );
                });
              })
          }
        ]
      });
    }
  };

  return (
    <>
      <button
        className="new-ride-form-back-button"
        id="back-arrow-detail"
        onClick={() => props.history.push("/users/new")}
      >
        BACK
      </button>
      <form className="main-form" onSubmit={constructNewRollerCoaster}>
        <fieldset className="fs-form">
          <h3 className="title">Input Ride Details</h3>
          <div className="create-form">
            <label htmlFor="inputName">Roller Coaster Name</label>
            <input
              className="input"
              onChange={handleRollerCoasterFieldChange}
              type="name"
              id="name"
              placeholder="Enter Roller Coaster Name"
              required=""
              autoFocus=""
              value={rollerCoaster.name}
            />
            <label htmlFor="inputTrackType">Track Type</label>
            <input
              className="input"
              onChange={handleTrackTypeFieldChange}
              type="text"
              id="name"
              placeholder="Enter The Track Type"
              required=""
              autoFocus=""
              value={trackType.name}
            />

            <label htmlFor="inputMaxHeight">Max Height</label>
            <input
              className="input"
              onChange={handleRollerCoasterFieldChange}
              type="text"
              id="max_height"
              placeholder="Max Height"
              required=""
              autoFocus=""
              value={rollerCoaster.max_height}
            />
            <label htmlFor="inputMaxSpeed">Max Speed</label>
            <input
              className="input"
              onChange={handleRollerCoasterFieldChange}
              type="text"
              id="max_speed"
              placeholder="Max Speed"
              required=""
              autoFocus=""
              value={rollerCoaster.max_speed}
            />
            <label htmlFor="inputPark">Park Name</label>
            <input
              className="input"
              onChange={handleParkFieldChange}
              type="text"
              id="name"
              placeholder="Enter Home Park Of Ride"
              required=""
              autoFocus=""
              value={park.name}
            />
            <label htmlFor="inputParkLocation">Park State/ Location</label>
            <input
              className="input"
              onChange={handleParkFieldChange}
              type="text"
              id="parkLocation"
              placeholder="Enter State or Providence of Park is Located"
              required=""
              autoFocus=""
              value={park.parkLocation}
            />
            <label htmlFor="inputParkCountry">Park Country</label>
            <input
              className="input"
              onChange={handleParkFieldChange}
              type="text"
              id="parkCountry"
              placeholder="Enter Country Park is Located"
              required=""
              autoFocus=""
              value={park.parkCountry}
            />
            <label htmlFor="inputManufacturer">Manufacturer</label>
            <input
              className="input"
              onChange={handleManufacturerFieldChange}
              type="dropdown"
              id="name"
              placeholder="Enter Manufacturer Name"
              required=""
              autoFocus=""
              value={manufacturer.name}
            />
            <label htmlFor="inputManufacturer">
              Manufacturer Country Of Operations
            </label>
            <input
              className="input"
              onChange={handleManufacturerFieldChange}
              type="text"
              id="origin_country"
              placeholder="Country"
              required=""
              autoFocus=""
              value={manufacturer.origin_country}
            />
            <label htmlFor="inputManufacturer">
              Manufacturer Company Website
            </label>
            <input
              className="input"
              onChange={handleManufacturerFieldChange}
              type="text"
              id="manufacture_url"
              placeholder="Please Provide a Link to the Company Website"
              required=""
              autoFocus=""
              value={manufacturer.manufacture_url}
            />
            <button
              className="create-new-rollerCoaster-btn"
              type="submit"
              disabled={IsLoading}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AddNewRollerCoaster;
