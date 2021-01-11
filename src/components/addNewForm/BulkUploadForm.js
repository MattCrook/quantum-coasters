import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import parkManager from "../../modules/parks/parkManager";
import trackTypeManager from "../../modules/tracktypes/trackTypeManager";
import manufacturerManager from "../../modules/manufacturers/manfacturerManager";
import rollerCoasterManager from "../../modules/rollerCoasters/rollerCoasterManager";
import NavHeader from "../nav/NavHeader";
import Form from "./pages/Form";
import BulkSubmitPreview from "./pages/BulkSubmitPreview";
import { confirmAlert } from "react-confirm-alert";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import "./styles/BulkRCForm.css";
import "react-confirm-alert/src/react-confirm-alert.css";
// import CustomizedInputBase from "../search/CustomizedInputBase";
// import { useActivityLog } from "../../contexts/ActivityLogContext";
// import Parks from "./pages/Parks";

const BulkUploadForm = (props) => {
  const { postNewErrorLog } = useErrorLog();
  const { loading, isAuthenticated } = useAuth0();
  const [manufacturers, setManufacturers] = useState([]);
  const [trackTypes, setTrackTypes] = useState([]);
  const [fullRideData, setFullRideData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [refs, setRefs] = useState("");
  const [park, setPark] = useState("");
  const rollerCoasterNameRef = useRef();
  const trackTypeRef = useRef();
  const maxHeightRef = useRef();
  const maxSpeedRef = useRef();
  const manufacturerRef = useRef();
  const parkId = props.parkId;
  const [isForm, setIsForm] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [ridesAddedList, setRidesAddedList] = useState([]);
  const [isActionButton, setIsActionButton] = useState(true);

  const showForm = () => {
    setIsActionButton(false);
    setIsForm(true);
  };

  const hideForm = () => {
    setIsForm(false);
    setIsActionButton(true);
  };

  const showPreview = () => {
    setIsActionButton(false);
    setIsPreview(true);
  };
  const hidePreview = () => {
    setIsPreview(false);
    setIsActionButton(true);
  };

  const allTrackTypes = async () => {
    const trackTypesFromApi = await trackTypeManager.getTrackTypes();
    setTrackTypes(trackTypesFromApi);
  };

  const allManufacturers = async () => {
    const manufacturersFromApi = await manufacturerManager.getAllManufacturers();
    setManufacturers(manufacturersFromApi);
  };

  const currentPark = async (parkId) => {
    const park = await parkManager.retrievePark(parkId);
    setPark(park);
  };

  const partitionedRollerCoasterData = async (newRidesList) => {
    let rollerCoasters = [];
    newRidesList.forEach((ride) => {
      const fullRideData = extendedRollerCoasterResource(ride);
      rollerCoasters.push(fullRideData);
    });
    const data = await Promise.all(rollerCoasters);
    return data;
  };

  const extendedRollerCoasterResource = async ({ name, trackTypeId, max_height, max_speed, manufacturerId }) => {
    const trackType = await trackTypeManager.retrieveTrackType(trackTypeId);
    const manufacturer = await manufacturerManager.retrieveManufacturer(manufacturerId);

    const rollerCoaster = {
      name: name,
      trackType: trackType,
      max_height: max_height,
      max_speed: max_speed,
      park: park,
      manufacturer: manufacturer,
    };
    return rollerCoaster;
  };

  const confirmAddRideToListAndSetRideData = async (newRide) => {
    const listInState = [...ridesAddedList];
    listInState.push(newRide);
    setRidesAddedList(listInState);
    const rollerCoasterData = await partitionedRollerCoasterData(listInState);
    setFullRideData(rollerCoasterData);
    hideForm();
  };

  // Confirm button when user saves the form data.
  // Calls confirmAndAddRideToList which adds to and saves the array of RC's in state,
  // To be carried through to the preview page, then submitted.
  const confirm = async (e) => {
    e.preventDefault();
    const newRollerCoaster = {
      name: rollerCoasterNameRef.current.value,
      trackTypeId: trackTypeRef.current.value,
      max_height: maxHeightRef.current.value,
      max_speed: maxSpeedRef.current.value,
      parkId: parkId,
      manufacturerId: manufacturerRef.current.value,
    };
    await confirmAddRideToListAndSetRideData(newRollerCoaster);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const rideCount = ridesAddedList.length;
      const parkName = park.name;
      const rideObjectToPost = {
          isBulk: true,
          data: ridesAddedList,
      }
    try {
      confirmAlert({
        title: "Confirm Submission",
        message: `Select 'Yes' to confirm the submission of (${rideCount}) rides to ${parkName}.`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              setIsLoading(true);
              await rollerCoasterManager.sendBulkSubmit(rideObjectToPost);
              setIsLoading(false);
              props.history.push("/user/parks/addcredit");
            },
          },
          {
            label: "No",
            onClick: () => "",
          },
        ],
      });
    } catch (error) {
      console.log({ error });
      await postNewErrorLog(error, "BulkUploadForm.js", "submitForm");
    }
  };

  useEffect(() => {
    const initBulkUploadForm = () => {
      allTrackTypes();
      allManufacturers();
      currentPark(parkId);

      const refObjectContainer = {
        rollerCoasterNameRef: rollerCoasterNameRef,
        trackTypeRef: trackTypeRef,
        maxHeightRef: maxHeightRef,
        maxSpeedRef: maxSpeedRef,
        manufacturerRef: manufacturerRef,
      };
      setRefs(refObjectContainer);
    };
    initBulkUploadForm();
  }, [parkId]);


    
  return (
    <>
      <NavHeader />
      <div id="bulk_upload_master_container">
        <div className="rides_added_container">
          <div className="rides_added_title_container">
            <div className="rides_added_title">Rides Added</div>
          </div>
          <div className="rides_added_list">
            {ridesAddedList.length > 0 ? (
              ridesAddedList.map((ride, i) => (
                <div key={i} className="ride_list_li_wrapper">
                  <li key={i} className="ride_list_li_item">
                    {ride.name}
                  </li>
                  <i className="fas fa-info-circle"></i>
                </div>
              ))
            ) : (
              <div className="none_rides_added">None</div>
            )}
          </div>
        </div>
        {!loading && isAuthenticated && isForm && !isActionButton && (
          <button className="back_to_previous" onClick={() => hideForm()}>
            &lt; Back To Previous
          </button>
        )}
      </div>
      {!loading && isAuthenticated && !isForm && isActionButton && (
        <>
          <div className="add_ride_btn_wrapper">
            <div className="add_ride_btn" onClick={() => showForm()}>
              Add Ride<i className="fas fa-plus"></i>
            </div>
          </div>
          {ridesAddedList && ridesAddedList.length > 1 ? (
            <div className="preview_and_submit_btn_container">
              <button className="preview_and_submit_btn" onClick={() => showPreview()}>
                Preview and Submit
                <i className="fas fa-long-arrow-alt-right"></i>
              </button>
            </div>
          ) : null}
          <div className="padding"></div>
          <div className="signature">
            <p id="signature_font_form">
              <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
            </p>
          </div>
        </>
      )}
      {!loading && isAuthenticated && !isActionButton && isForm && (
        <Form
          manufacturers={manufacturers}
          trackTypes={trackTypes}
          park={park}
          refs={refs}
          submitForm={submitForm}
          IsLoading={IsLoading}
          hideForm={hideForm}
          confirm={confirm}
          {...props}
        />
      )}
      {!loading && isAuthenticated && ridesAddedList && isPreview && !isForm && (
        <>
          <button className="back_to_previous" onClick={() => hidePreview()}>
            &lt; Back To Previous
          </button>
          <BulkSubmitPreview
            park={park}
            refs={refs}
            ridesAddedList={ridesAddedList}
            fullRideData={fullRideData}
            submitForm={submitForm}
            IsLoading={IsLoading}
            {...props}
          />
        </>
      )}
    </>
  );
};

export default BulkUploadForm;
