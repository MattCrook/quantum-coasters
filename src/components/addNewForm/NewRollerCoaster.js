import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { confirmAlert } from "react-confirm-alert";
import { handleFieldChangeHelper } from "../../modules/Helpers";
import { setResourceStateHelperFunction } from "../../modules/Helpers";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./NewRollerCoasterForm.css";

const AddNewRollerCoaster = props => {
  const [manufacturers, setManufacturers] = useState([]);
  const [trackTypes, setTrackTypes] = useState([]);
  const [parks, setParks] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState({});
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

  // handle what user is typing in (helper function in helpers.js)
  const handleRollerCoasterFieldChange = handleFieldChangeHelper(rollerCoaster, setRollerCoaster);
  const handleParkFieldChange = handleFieldChangeHelper(park, setPark);
  const handleTrackTypeFieldChange = handleFieldChangeHelper(trackType, setTrackType);
  const handleManufacturerFieldChange = handleFieldChangeHelper(manufacturer, setManufacturer);

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
      manufacturer.name === ""
      // manufacturer.origin_country === "" ||
      // manufacturer.manufacture_url === ""
    ) {
      alert("Please fill out all fields in form");
    } else {
      setIsLoading(true);
      confirmAlert({
        title: "Confirm Roller Coaster Data Submission",
        message: "Confirm",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
            // Function to check database, when a user submits a New Roller Coaster to be added to database, (<AddNewForm/>)
            // Function corrects problem of creating new resource when one already exists...
            // Checks database for unique name, or what user inputs to field,  if does not exist it creates new resource, if not will tie to existing resource.
              try {
                const getTrackTypeName = await ApiManager.getTrackTypeByByName(trackType.name);
                const getParkName = await ApiManager.getParkByName(park.name);
                const getManufacturerName = await ApiManager.getManufacturerByName(manufacturer.name);

                var trackTypeId = getTrackTypeName.length > 0 ? getTrackTypeName[0].id : false;
                var parkId = getParkName.length > 0 ? getParkName[0].id : false;
                var manufacturerId = getManufacturerName.length > 0 ? getManufacturerName[0].id : false;

              } catch (error) {
                console.log({ error });
              }

              if (!trackTypeId) {
                const trackType = await ApiManager.postNewTrackType(newTrackType);
                trackTypeId = trackType.id;
              }

              if (!parkId) {
                const park = await ApiManager.postNewPark(newPark);
                parkId = park.id;
              }

              if (!manufacturerId) {
                const manufacturer = await ApiManager.postNewManufacturer(newManufacturer);
                manufacturerId = manufacturer.id;
              }

              const newRollerCoaster = {
                name: rollerCoaster.name,
                trackTypeId: trackTypeId,
                max_height: rollerCoaster.max_height,
                max_speed: rollerCoaster.max_speed,
                parkId: parkId,
                manufacturerId: manufacturerId
              };

              ApiManager.postNewRollerCoaster(newRollerCoaster).then(() => {
                setIsLoading(false);
                props.history.push("/users/new")
              });
            }
          },
          {
            label: "No",
            onClick: () => ""
          }
        ]
      });
    }
  };



  useEffect(() => {
    setResourceStateHelperFunction(
      setManufacturers,
      setTrackTypes,
      setParks,
      setIsLoading
    );
  }, []);

  return (
    <>
      {/* <button
        className="new-ride-form-back-button"
        id="back-arrow-detail"
        onClick={() => props.history.push("/users/new")}
      >
        BACK
      </button> */}
      <form className="main-form" onSubmit={constructNewRollerCoaster}>
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
          <select
            className="input"
            type="dropdown"
            onChange={handleTrackTypeFieldChange}
            id="name"
            placeholder="Enter The Track Type"
            value={trackType.name}
          >
            {trackTypes.map(track => (
              <option key={track.id} value={track.name}>
                {track.name}
              </option>
            ))}
          </select>

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
          <select
            className="input"
            onChange={handleManufacturerFieldChange}
            id="name"
            placeholder="Select Manufacturer Name"
            required=""
            autoFocus=""
            // value={manufacturer.name}
          >
            {manufacturers.map(manufacturer => (
              <option key={manufacturer.id} >
                {manufacturer.name}
              </option>
            ))}
          </select>
          {/* <label htmlFor="inputManufacturer">
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
          /> */}
          <button
            className="create-new-rollerCoaster-btn"
            type="submit"
            disabled={IsLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewRollerCoaster;
