import React, { useState, useEffect } from "react";
import trackTypeManager from "../../modules/tracktypes/trackTypeManager";
import parkManager from "../../modules/parks/parkManager";
import manufacturerManager from "../../modules/manufacturers/manfacturerManager";
import rollerCoasterManager from "../../modules/rollerCoasters/rollerCoasterManager";
import { confirmAlert } from "react-confirm-alert";
import { handleFieldChangeHelper } from "../../modules/Helpers";
import { setResourceStateHelperFunction } from "../../modules/Helpers";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./NewRollerCoasterForm.css";

const AddNewRollerCoaster = (props) => {
  const { postNewErrorLog } = useErrorLog();
  const [manufacturers, setManufacturers] = useState([]);
  const [trackTypes, setTrackTypes] = useState([]);
  const [parks, setParks] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState({});
  const [trackType, setTrackType] = useState({ name: "" });
  const [park, setPark] = useState({
    name: "",
    parkLocation: "",
    parkCountry: "",
  });

  // set initial state of form to empty
  const [rollerCoaster, setRollerCoaster] = useState({
    name: "",
    trackTypeId: "",
    max_height: "",
    max_speed: "",
    manufacturerId: "",
    parkId: "",
  });

  // handle what user is typing in (helper function in helpers.js)
  const handleRollerCoasterFieldChange = handleFieldChangeHelper(rollerCoaster, setRollerCoaster);
  const handleParkFieldChange = handleFieldChangeHelper(park, setPark);
  const handleTrackTypeFieldChange = handleFieldChangeHelper(trackType, setTrackType);
  const handleManufacturerFieldChange = handleFieldChangeHelper(manufacturer, setManufacturer);

  // object to go into database
  const constructNewRollerCoaster = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    const newPark = {
      name: park.name,
      parkLocation: park.parkLocation,
      parkCountry: park.parkCountry,
    };

    const newManufacturer = {
      name: manufacturer.name,
      origin_country: manufacturer.origin_country,
      manufacture_url: manufacturer.manufacture_url,
    };

    const newTrackType = {
      name: trackType.name,
    };

    // guard to make sure all fields are filled out
    if (rollerCoaster.name === "" || rollerCoaster.max_height === "" || rollerCoaster.max_speed === "") {
      alert("Please fill out all fields in form");
    } else {
      confirmAlert({
        title: "Roller Coaster Data Submission",
        message: "Click Yes To Confirm",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              // Function to check database, when a user submits a New Roller Coaster to be added to database, (<AddNewForm/>)
              // Function corrects problem of creating new resource when one already exists...
              // Checks database for unique name, or what user inputs to field,  if does not exist it creates new resource, if not will tie to existing resource.
              try {
                console.log({ trackType });
                console.log({ park });
                console.log({ manufacturer });

                const getTrackTypeName = await trackTypeManager.getTrackTypeByByName(trackType.name);
                const getParkName = await parkManager.getParkByName(park.name);
                const getManufacturerName = await manufacturerManager.getManufacturerByName(manufacturer.name);

                var trackTypeId = getTrackTypeName.length > 0 ? getTrackTypeName[0].id : false;
                var parkId = getParkName.length > 0 ? getParkName[0].id : false;
                var manufacturerId = getManufacturerName.length > 0 ? getManufacturerName[0].id : false;
              } catch (error) {
                console.log({ error });
                await postNewErrorLog(error, "NewRollerCoaster.js", "constructNewRollerCoaster-ConfirmAlert-OnClick");
              }

              if (!trackTypeId) {
                const trackType = await trackTypeManager.postNewTrackType(newTrackType);
                trackTypeId = trackType.id;
              }

              if (!parkId) {
                const park = await parkManager.postNewPark(newPark);
                parkId = park.id;
              }

              if (!manufacturerId) {
                const manufacturer = await manufacturerManager.postNewManufacturer(newManufacturer);
                manufacturerId = manufacturer.id;
              }

              const newRollerCoaster = {
                name: rollerCoaster.name,
                trackTypeId: trackTypeId,
                max_height: rollerCoaster.max_height,
                max_speed: rollerCoaster.max_speed,
                parkId: parkId,
                manufacturerId: manufacturerId,
              };

              rollerCoasterManager
                .postNewRollerCoaster(newRollerCoaster)
                .then(() => {
                  setIsLoading(false);
                  props.history.push("/user/parks/addcredit");
                })
                .catch((error) => {
                  postNewErrorLog(
                    error,
                    "constructNewRollerCoaster.js",
                    "constructNewRollerCoaster-postNewRollerCoaster"
                  );
                });
            },
          },
          {
            label: "No",
            onClick: () => "",
          },
        ],
      });
    }
  };

  useEffect(() => {
    setResourceStateHelperFunction(setManufacturers, setTrackTypes, setParks, setIsLoading);
  }, []);

  return (
    <>
      <form className="main-form" onSubmit={constructNewRollerCoaster}>
        <h3 className="title">Input Ride Details</h3>
        <div className="create-form">
          <fieldset className="add_new_ride_container">
            <label className="rollercoaster_name" htmlFor="inputName">
              Roller Coaster Name
            </label>
            <input
              className="form-control"
              onChange={handleRollerCoasterFieldChange}
              type="text"
              id="name"
              value={rollerCoaster.name}
              required
            />
            <label className="add_new_rollercoaster_form_label" htmlFor="inputTrackType">
              Track Type
            </label>
            <select
              className="form-control"
              onChange={handleTrackTypeFieldChange}
              id="name"
              value={trackType.name}
              required
            >
              {trackTypes.map((track, i) => (
                <option key={track.id} value={track.name}>
                  {track.name}
                </option>
              ))}
            </select>

            <label className="add_new_rollercoaster_form_label" htmlFor="inputMaxHeight">
              Max Height
            </label>
            <input
              className="form-control"
              onChange={handleRollerCoasterFieldChange}
              type="text"
              id="max_height"
              value={rollerCoaster.max_height}
              required
            />
            <label className="add_new_rollercoaster_form_label" htmlFor="inputMaxSpeed">
              Max Speed
            </label>
            <input
              className="form-control"
              onChange={handleRollerCoasterFieldChange}
              type="text"
              id="max_speed"
              value={rollerCoaster.max_speed}
              required
            />

            <label className="add_new_rollercoaster_form_label" htmlFor="inputPark">
              Park Name
            </label>
            <select
              className="form-control"
              onChange={handleParkFieldChange}
              type="text"
              id="name"
              value={park.name}
              required
            >
              {parks.map((park) => (
                <option key={park.id} value={park.name}>
                  {park.name}
                </option>
              ))}
            </select>

            <div className="add_new_park_btn_container">
              <div className="add_park_description">
                *Don't see the park in the dropdown? Click the link and add the park to help us expand our repertoire!
              </div>
              <button
                className="link_to_add_park_form"
                onClick={() => props.history.push("/new/rollercoaster/parks/create")}
              >
                Add New Park
              </button>
            </div>

            <label className="add_new_rollercoaster_form_label" htmlFor="inputManufacturer">
              Manufacturer
            </label>
            <select
              className="form-control"
              onChange={handleManufacturerFieldChange}
              id="name"
              value={manufacturer.name}
            >
              {manufacturers.map((manufacturer, i) => (
                <option key={manufacturer.id} value={manufacturer.name}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
            <button className="create-new-rollerCoaster-btn" type="submit" disabled={IsLoading}>
              Submit
            </button>
          </fieldset>
        </div>
      </form>
      <div className="signature">
        <p>
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};

export default AddNewRollerCoaster;
