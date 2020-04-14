import React, { useState, useEffect } from "react";
import { setResourceStateHelperFunction } from "../../modules/helpers";
import "./EditCreditForm.css";

const EditCreditForm = props => {
  console.log(props.creditId);

  const [manufacturers, setManufacturers] = useState([]);
  const [trackTypes, setTrackTypes] = useState([]);
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [credit, setCredit] = useState({
    name: "",
    trackTypeId: "",
    max_height: "",
    max_speed: "",
    parkId: "",
    manufacturerId: ""
  });

  const handleInputChange = e => {
    const stateToChange = { ...credit };
    stateToChange[e.target.id] = e.target.value;
    setCredit(stateToChange);
  };

  const updateExistingCredit = e => {
    e.preventDefault();
    setIsLoading(true);

    const editedCredit = {
      id: props.creditId,
      name: credit.name,
      trackTypeId: credit.trackTypeId,
      max_height: credit.max_height,
      max_speed: credit.max_speed,
      parkId: credit.park,
      manufacturerId: credit.manufacturer
    };

    //   ApiManager.updateCredit(editedCredit).then(() =>
    //     props.history.push("/users")
    //   );
    window.alert(
      "Edit functionality coming soon! Thanks for your patience as we continue to make this app the best it can be!"
    );
    props.history.push("/users");
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
      <div className="back-btn-edit-container">
        <button
          className="edit-form-back-button"
          id="back-arrow-detail"
          onClick={() => props.history.push("/users")}
        >
          BACK
        </button>
      </div>
      <form className="edit-credit-form">
        <div className="edit-formgrid">
          <div className="edit-form-fields">
            <div>
              <label htmlFor="name">Roller Coaster Name</label>
              <p>
                <textarea
                  type="text"
                  rows="2"
                  cols="80"
                  required
                  className="form-control"
                  onChange={handleInputChange}
                  id="name"
                  value={credit.name}
                />
              </p>
            </div>
            <div>
              <label htmlFor="trackType">Track Type</label>
              <select
                className="form-control"
                required
                id="trackTypeId"
                value={credit.trackTypeId}
                onChange={handleInputChange}
              >
                {trackTypes.map(trackType => (
                  <option key={trackType.id}>{trackType.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="max_height">Max Height</label>
              <p>
                <textarea
                  type="text"
                  rows="2"
                  cols="40"
                  required
                  className="form-control"
                  onChange={handleInputChange}
                  id="max_height"
                  value={credit.max_height}
                />
              </p>
            </div>
            <div>
              <label htmlFor="max_speed">Max Speed</label>
              <p>
                <textarea
                  type="text"
                  rows="2"
                  cols="40"
                  required
                  className="form-control"
                  onChange={handleInputChange}
                  id="max_speed"
                  value={credit.max_speed}
                />
              </p>
            </div>
            <div>
              <label htmlFor="parkId">Park Name</label>
              <p>
                <select
                  required
                  className="form-control"
                  onChange={handleInputChange}
                  id="parkId"
                  value={credit.parkId}
                >
                  {parks.map(park => (
                    <option key={park.id}>{park.name}</option>
                  ))}
                </select>
              </p>
            </div>
            <div>
              <label htmlFor="manufacturerId">Manufacturer</label>
              <select
                className="form-control"
                required
                id="manufacturerId"
                value={credit.manufacturerId}
                onChange={handleInputChange}
              >
                {manufacturers.map(manufacturer => (
                  <option key={manufacturer.id}>{manufacturer.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="edit-alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingCredit}
              id="editCreditFormBtn"
              className="ui blue basic button"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditCreditForm;
