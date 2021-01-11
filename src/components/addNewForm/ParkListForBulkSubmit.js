import React, { useState, useEffect } from "react";
// import ParkList from "./RollerCoasterList";
// import CustomizedInputBase from "../search/CustomizedInputBase";
import parkManager from "../../modules/parks/parkManager";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import Parks from "./pages/Parks";
import NavHeader from "../nav/NavHeader";
// import "../styles/NewCreditForm.css";
import "./styles/BulkRCForm.css";

const ParkListForBulkSubmit = (props) => {
  const { postActivityLogCreateRollerCoster } = useActivityLog();
  const { authUser } = props;
  const { userProfile } = props;
  const [parks, setParks] = useState([]);
  const [allParks, setAllParks] = useState([]);

  useEffect(() => {
    const parksFromAPI = async () => {
      const getAllParks = await parkManager.getParks();
      console.log(getAllParks);
      setParks(getAllParks);
      setAllParks(getAllParks);
    };
    parksFromAPI();
  }, []);

  console.log(allParks);
  return (
    <>
          <NavHeader {...props} />
          <div className="parks_title_wrapper">
          <div className="parks_title">Select A Park to Bulk Add Rides To</div>
          </div>
      <div className="parks_bulkform_main_container">
        {allParks.map((park) => (
          <Parks key={park.id} park={park} {...props} />
        ))}
      </div>
    </>
  );
};

export default ParkListForBulkSubmit;
