import React, { useState, useEffect } from "react";
import parkManager from "../../modules/parks/parkManager";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import Parks from "./pages/Parks";
import NavHeader from "../nav/NavHeader";
import "./styles/BulkRCForm.css";
// import ParkList from "./RollerCoasterList";
// import CustomizedInputBase from "../search/CustomizedInputBase";
// import "../styles/NewCreditForm.css";

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

  return (
    <>
      <NavHeader {...props} />
      <button className="back_to_previous" onClick={() => props.history.push("/user/parks/addcredit")}>
        &lt; Back To Previous
      </button>
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
