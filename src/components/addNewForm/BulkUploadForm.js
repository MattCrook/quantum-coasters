import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
// import CustomizedInputBase from "../search/CustomizedInputBase";
import parkManager from "../../modules/parks/parkManager";
import trackTypeManager from "../../modules/tracktypes/trackTypeManager";
import manufacturerManager from "../../modules/manufacturers/manfacturerManager";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import Parks from "./pages/Parks";
import NavHeader from "../nav/NavHeader";
import Form from "./pages/Form";
// import "../styles/NewCreditForm.css";
import "./styles/BulkRCForm.css";

const BulkUploadForm = (props) => {
  const { postNewErrorLog } = useErrorLog();
  const { loading, isAuthenticated } = useAuth0();
  const [manufacturers, setManufacturers] = useState([]);
  const [trackTypes, setTrackTypes] = useState([]);
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
    const ridesAddedList = [];

  const showForm = () => {
    setIsForm(true);
  };

  const hideForm = () => {
    setIsForm(false);
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

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newRollerCoaster = {
      name: rollerCoasterNameRef.current.value,
      trackTypeId: trackTypeRef.current.value,
      max_height: maxHeightRef.current.value,
      max_speed: maxSpeedRef.current.value,
      parkId: parkId,
      manufacturerId: manufacturerRef.current.value,
    };
      console.log(newRollerCoaster);
      ridesAddedList.push(newRollerCoaster);
    setIsLoading(false);
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
              <div className="rides_added_container">
              <div className="rides_added_title_container">
                  <div className="rides_added_title">Rides Added</div>
              </div>
              <div className="rides_added_list">
                  {ridesAddedList.length > 0 ? (
                  ridesAddedList.map(ride => (
                      <li>{ride.name}</li>
                  ))
                  ) : (
                  <div className="none_rides_added">None</div>
                  )}
              </div>
          </div>
          {!loading && isAuthenticated && !isForm && (
        <div className="add_ride_btn_wrapper">
          <div className="add_ride_btn" onClick={() => showForm()}>
            <i className="fas fa-plus"></i>Add Ride
          </div>
        </div>
      )}
      {!loading && isAuthenticated && isForm && (
        <Form
          manufacturers={manufacturers}
          trackTypes={trackTypes}
          park={park}
          refs={refs}
          submitForm={submitForm}
          IsLoading={IsLoading}
          hideForm={hideForm}
          {...props}
        />
      )}
    </>
  );
};

export default BulkUploadForm;
