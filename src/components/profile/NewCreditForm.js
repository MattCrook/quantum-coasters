import React, { useState, useCallback, useMemo } from "react";
import ParkList from "./RollerCoasterList";
import CustomizedInputBase from "../search/CustomizedInputBase";
import parkManager from "../../modules/parks/parkManager";
import "./NewCreditForm.css";

// return ParkList component when user clicks the "add new credit button" on {ProfileList}...
const AddNewCreditForm = (props) => {
  const { authUser } = props;
  const { userProfile } = props;
  const [parks, setParks] = useState([]);
  const [searchInput, setSearchInput] = useState();

  const handleSearchInput = (e) => {
    let state = { ...searchInput };
    state = e.target.value;
    setSearchInput(state);
    handleSearchSubmit(state);
  };

  const handleSearchSubmit = useCallback((state) => {
      const filteredParks = parks.filter((park) => {
        return park.name.toLowerCase().includes(state.toLowerCase());
      });
      setParks(filteredParks);
    },
    [parks]
  );

  useMemo(() => {
    const parksFromAPI = async () => {
      const getAllParks = await parkManager.getParks();
      setParks(getAllParks);
    };
    parksFromAPI();
  }, []);

  return (
    <>
      <section className="ride-not-found-section">
        <div className="banner-container">
          <h3 className="banner">
            Don't see the ride you are looking for? Click below and help us add to our repertoire!
          </h3>
          <div className="search-bar-container">
            <CustomizedInputBase handleSearchInput={handleSearchInput} {...props} />
          </div>
        </div>
        <div className="create_new_rc_side_nav">
        <button type="button" className="add-new-ride-btn" onClick={() => props.history.push("/new/rollercoaster")}>
            Create New Roller Coaster
          {/* <i className="fas fa-database"></i> */}
        </button>
        </div>
      </section>

      <div className="rollerCoaster-list-to-add-credits">
        <ParkList parks={parks} authUser={authUser} userProfile={userProfile} {...props} />
      </div>
    </>
  );
};

export default AddNewCreditForm;
