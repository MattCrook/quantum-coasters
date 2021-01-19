import React, { useState, useEffect } from "react";
import ParkList from "./RollerCoasterList";
import CustomizedInputBase from "../../search/CustomizedInputBase";
import parkManager from "../../../modules/parks/parkManager";
import { useActivityLog } from "../../../contexts/ActivityLogContext";
import "../styles/NewCreditForm.css";

// return ParkList component when user clicks the "add new credit button" on {ProfileList}...
const AddNewCreditForm = (props) => {
  const { postActivityLogCreateRollerCoster } = useActivityLog();
  const { authUser } = props;
  const { userProfile } = props;
  const [parks, setParks] = useState([]);
  const [allParks, setAllParks] = useState([]);
  const [searchInput, setSearchInput] = useState();

  const handleSearchInput = (e) => {
    let state = { ...searchInput };
    state = e.target.value;
    setSearchInput(state);
    handleSearch(state);
  };

  const handleSearch = (state) => {
    const filteredParks = parks.filter((park) => {
      return park.name.toLowerCase().includes(state.toLowerCase());
    });
    setParks(filteredParks);
    return filteredParks;
  };

  useEffect(() => {
    const parksFromAPI = async () => {
      const getAllParks = await parkManager.getParks();
      setParks(getAllParks);
      setAllParks(getAllParks);
    };
    parksFromAPI();
  }, []);

  return (
    <>
      <section className="ride-not-found-section">
        <div className="banner-container">
          <div className="add_credit_banner">Add New Credit</div>
          <div className="search-bar-container">
            <CustomizedInputBase
              handleSearchInput={handleSearchInput}
              allParks={allParks}
              setParks={setParks}
              {...props}
            />
          </div>
        </div>
        <div className="create_new_rc_side_nav">
          <button
            type="button"
            className="add-new-ride-btn"
            onClick={(e) => postActivityLogCreateRollerCoster(e, props, authUser.id, "/new/rollercoaster")}
          >
            Create New Roller Coaster
          </button>
          <button
            type="button"
            className="add_new_ride_btn_bulk_upload"
            onClick={() => props.history.push("/parks")}
            // onClick={(e) => postActivityLogCreateRollerCoster(e, props, authUser.id, "/new/rollercoaster")}
          >
            Submit Bulk Upload to Park
          </button>
        </div>
      </section>
      <div className="banner"><i className="fas fa-info-circle"></i>Don't see the ride you are looking for? Select either Create new or Submit Bulk Upload to help us add to our repertoire!</div>

      <div className="rollerCoaster-list-to-add-credits">
        <ParkList parks={parks} authUser={authUser} userProfile={userProfile} {...props} />
      </div>
    </>
  );
};

export default AddNewCreditForm;
