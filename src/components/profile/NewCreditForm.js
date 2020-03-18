import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./NewCreditFrom.css";

const AddNewCreditForm = props => {
  const { loading, user, history } = useAuth0();

  const [credit, setCredit] = useState({
    name: "",
    trackTypeId: "",
    max_height: "",
    max_speed: "",
    parkId: "",
    manufacturerId: "",
    userId: ""
  });
  const handleFieldChange = e => {
    const stateToChange = { ...credit };
    stateToChange[e.target.id] = e.target.value;
    setCredit(stateToChange);
  };

    const createNewCredit = e => {
      e.preventDefault();
      const newCredit = {
        name: credit.name,
        trackType: credit.trackType,
        max_height: credit.max_height,
        max_speed: credit.max_speed,
        park: credit.park,
        manufacturer: credit.manufacturer,
        userId: user.id
      };

      if (
        credit.name === "" ||
        credit.trackType === "" ||
        credit.max_height === "" ||
        credit.max_speed === "" ||
        credit.manufacturer === "" ||
        credit.park === ""
      ) {
        alert("Please fill out all fields in form");
      } else {
        !loading &&
          ApiManager.postNewRollerCoaster(newCredit).then(() =>
            history.push("/profile")
          )}
      }

  useEffect(() => {

  });

  return (
    <>
      <div className="icon-container">
        <i
          className="big arrow circle left icon"
          id="back-arrow-detail"
          onClick={() => props.history.push("/profile")}
        ></i>
      </div>
      <form>
        <fieldset className="credit-form">
          <div className="formgrid">
            <div>
              <label htmlFor="name">Roller Coaster Name</label>
              <p>
                <textarea
                  type="text"
                  rows="2"
                  cols="40"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
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
                onChange={handleFieldChange}
              >
                {/* {rollerCoasters.map(rollerCoaster => (
                  <option
                    key={rollerCoaster.trackTypeId}
                    value={rollerCoaster.trackTypeId}
                  >
                    {trackType.name}
                  </option> */}
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
                  onChange={handleFieldChange}
                  id="max_height"
                  value={credit.max_height}
                />
              </p>
            </div>
            <div>
              <label htmlFor="max_height">Max Speed</label>
              <p>
                <textarea
                  type="text"
                  rows="2"
                  cols="40"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="max_speed"
                  value={credit.max_height}
                />
              </p>
            </div>
            <div>
              <label htmlFor="parkId">Park Name</label>
              <p>
                <textarea
                  type="text"
                  rows="2"
                  cols="40"
                  required
                  className="form-control"
                  onChange={handleFieldChange}
                  id="parkId"
                  value={credit.parkId}
                />
              </p>
            </div>
            <div>
              <label htmlFor="manufacturerId">Manufacturer</label>
              <select
                className="form-control"
                required
                id="manufacturerId"
                value={credit.manufacturerId}
                onChange={handleFieldChange}
              >
                {/* {rollerCoasters.map(rollerCoaster => (
                  <option
                    key={rollerCoaster.manufacturerId}
                    value={rollerCoaster.manufacturerId}
                  >
                    {manufacturer.name}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={loading}
            //   onClick={createNewCredit}
              id="newCreditFormBtn"
              className="ui blue basic button"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AddNewCreditForm;
