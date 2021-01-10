import React, { useState, useEffect } from "react";
import trackTypeManager from "../../modules/tracktypes/trackTypeManager";
import parkManager from "../../modules/parks/parkManager";
import manufacturerManager from "../../modules/manufacturers/manfacturerManager";
import rollerCoasterManager from "../../modules/rollerCoasters/rollerCoasterManager";
import { confirmAlert } from "react-confirm-alert";
import { handleFieldChangeHelper } from "../../modules/Helpers";
import { setResourceStateHelperFunction } from "../../modules/Helpers";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import NavHeader from "../nav/NavHeader";
import MicroModal from "micromodal";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./NewRollerCoasterForm.css";

const AddNewRollerCoaster = (props) => {
  const { loading, isAuthenticated } = useAuth0();
  const { postNewErrorLog } = useErrorLog();
  const [manufacturers, setManufacturers] = useState([]);
  const [trackTypes, setTrackTypes] = useState([]);
  const [parks, setParks] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
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
  // Controlled inputs
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
  };

  const handleInitConfirmModal = () => {
    if (
      rollerCoaster.name === "" ||
      rollerCoaster.max_height === "" ||
      rollerCoaster.max_speed === "" ||
      manufacturer.name === "" ||
      manufacturer.name === "Select Manufacturer" ||
      trackType.name === "" ||
      trackType.name === "Select Track Type" ||
      park.name === "" ||
      park.name === "Select Park"
    ) {
      alert("Please fill out all fields in the form.");
    } else {
      try {
        MicroModal.init({
          openTrigger: "data-micromodal-trigger",
          closeTrigger: "data-micromodal-close",
        });
      } catch (error) {
        postNewErrorLog(error, "NewRollerCoaster.js.js", "handleInitConfirmModal");
      }
    }
  };

  const confirmDataToSubmit = () => {
    setIsConfirmed(true);
  };

  useEffect(() => {
    setResourceStateHelperFunction(setManufacturers, setTrackTypes, setParks, setIsLoading);
  }, []);


  return (
    <>
      <NavHeader {...props} />
      <button className="back_to_previous" onClick={() => props.history.push("/user/parks/addcredit")}>
        &lt; Back To Previous
      </button>
      <div id="new_rc_form_master_container">
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
              <div className="form_ul">
                <li className="form_li">Please use full official ride name.</li>
                <li className="form_li">Double check spelling is correct!</li>
              </div>
              <label className="add_new_rollercoaster_form_label" htmlFor="inputTrackType">
                Track Type
              </label>
              <select
                className="form-control"
                onChange={handleTrackTypeFieldChange}
                id="name"
                // value={trackType.name}
                required
              >
                <option>Select Track Type</option>
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
              <div className="form_ul">
                <li className="form_li">All Measurements done in feet.</li>
                <li className="form_li">
                  No need to put the measurement identifier, i.e. ft or feet, or any other Imperial measurement system
                  identifier.
                </li>
                <li className="form_li">
                  Simply put the number, (For example - 100), and we will calculate and expect the number to mean 100
                  feet.
                </li>
              </div>
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
              <div className="form_ul">
                <li className="form_li">All Measurements done in Miles Per Hour (mph).</li>
                <li className="form_li">No need to put the speed unit of measurement.</li>
                <li className="form_li">
                  Simply put the number, (For example - 65), and we will calculate and expect the number to mean 65mph.
                </li>
              </div>

              <label className="add_new_rollercoaster_form_label" htmlFor="inputPark">
                Park Name
              </label>
              <select
                className="form-control"
                onChange={handleParkFieldChange}
                type="text"
                id="name"
                // value={park.name}
                required
              >
                <option>Select Park</option>
                {parks.map((park) => (
                  <option key={park.id} value={park.name}>
                    {park.name}
                  </option>
                ))}
              </select>

              <div className="add_new_park_btn_container">
                <li className="add_park_description">
                  Don't see the park in the dropdown? Click the link and add the park to help us expand our repertoire!
                </li>
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
                // value={manufacturer.name}
              >
                <option>Select Manufacturer</option>
                {manufacturers.map((manufacturer, i) => (
                  <option key={manufacturer.id} value={manufacturer.name}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
              {!loading && !IsLoading && !isConfirmed && (
                <div
                  className="create-new-rollerCoaster-btn-confirm"
                  disabled={IsLoading}
                  data-micromodal-trigger="modal-rc"
                  onClick={(e) => handleInitConfirmModal(e)}
                >
                  Review and Confirm
                </div>
              )}
              {!loading && !IsLoading && isConfirmed && (
                <button className="create-new-rollerCoaster-btn" type="submit" disabled={IsLoading}>
                  Submit
                </button>
              )}
            </fieldset>
          </div>
          <div className="signature">
            <p id="signature_font_rc_form">
              Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
            </p>
          </div>
        </form>
      </div>
      <div className="modal micromodal-slide" id="modal-rc" aria-hidden="true">
        <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
          <div
            id="rc_modal_container"
            className="modal__container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-rc-title"
          >
            <header id="rc_modal_header" className="modal__header">
              <h2 className="modal__title" id="modal-rc-title">
                Roller Coaster Submission Review
              </h2>
              <button
                id="rc_modal_close"
                className="modal__close"
                aria-label="Close modal"
                data-micromodal-close
              ></button>
            </header>
            <div className="rc_modal_description">
              Please double check the data is correct, if so press confirm then submit your data request.
            </div>

            <main className="modal__content_rc" id="modal-rc-content">
              <div className="new_form" id="rc_modal">
                {!loading && isAuthenticated && rollerCoaster ? (
                  <div className="new_form" id="rc_modal_content">
                    <div className="rc_modal_rc_name">{rollerCoaster.name}</div>
                    <div className="rc_modal_rc_data">
                      <div className="rc_modal_rc_data_items">
                        <div className="rc_modal_item_title">Max Height: </div>
                        {rollerCoaster.max_height} feet
                      </div>
                      <div className="rc_modal_rc_data_items">
                        <div className="rc_modal_item_title">Max Speed: </div>
                        {rollerCoaster.max_speed} mph
                      </div>
                      <div className="rc_modal_rc_data_items">
                        <div className="rc_modal_item_title">Manufacturer: </div>
                        {manufacturer.name}
                      </div>
                      <div className="rc_modal_rc_data_items">
                        <div className="rc_modal_item_title">Park: </div>
                        {park.name}
                      </div>
                      <div className="rc_modal_rc_data_items">
                        <div className="rc_modal_item_title">Track Type: </div>
                        {trackType.name}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rc_modal_error">Oops! Something went wrong.</div>
                )}
              </div>
              <footer className="modal__footer">
                <button
                  className="confirm_rc_modal_btn"
                  id="rc_modal__btn-primary"
                  onClick={() => confirmDataToSubmit()}
                  style={{ marginRight: "8px" }}
                  data-micromodal-close
                >
                  Confirm <i className="far fa-check-square"></i>
                </button>
              </footer>
              <div className="signature">
                <p id="signature_font">
                  Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
                  <i className="fas fa-trademark"></i>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewRollerCoaster;
