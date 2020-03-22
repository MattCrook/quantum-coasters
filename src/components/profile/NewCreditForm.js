import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { formatInput } from "../../modules/Helpers";
import "./NewCreditForm.css";

// form that user is taken to, to input new credit (new rollercoaster ridden)
// need check to see if the roller coaster exists in DB, if not user is taken to NewRollerCoasterForm
// to create the entry in DB, then back to their credit form to fill it out.
const AddNewCreditForm = props => {
  const { user, history } = useAuth0();
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
    manufacturerId: "",
    userId: ""
  });

  const handleFieldChange = e => {
    const stateToChange = { ...credit };
    stateToChange[e.target.id] = formatInput(e.target)
    setCredit(stateToChange);
  };

  const createNewCredit = e => {
    e.preventDefault();
    isLoading(true);


    if (
      credit.name === "" ||
      credit.trackType === "" ||
      credit.max_height === "" ||
      credit.max_speed === "" ||
      credit.manufacturer === "" ||
      credit.park === ""
    ) {
      window.alert("Please fill out all fields in form");
    } else {
      isLoading(true);
        ApiManager.postNewRollerCoaster(credit).then(() =>
          props.history.push("/profile")
        );
    }
  };



  // const result = formatInput(e.target.value);

  useEffect(() => {
    ApiManager.getAllManufacturers().then(manufacturers => {
      ApiManager.getTrackTypes().then(trackTypes => {
        ApiManager.getParks().then(parks => {
          setManufacturers(manufacturers);
          setTrackTypes(trackTypes);
          setParks(parks);
          setIsLoading(false);
        });
      });
    });
  }, []);

  return (
    <>
      <div className="new-credit-form-container">
        <form>
          <div className="new-credit-icon-container">
            <i
              className="big arrow circle left icon"
              id="back-arrow-detail"
              onClick={() => props.history.push("/profile")}
            ></i>
          </div>
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
                  {trackTypes.map(trackType => (
                    <option key={trackType.id} value={trackType.id}>
                      {trackType.name}
                    </option>
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
                <label htmlFor="max_speed">Max Speed</label>
                <p>
                  <textarea
                    type="text"
                    rows="2"
                    cols="40"
                    required
                    className="form-control"
                    onChange={handleFieldChange}
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
                    onChange={handleFieldChange}
                    id="parkId"
                    value={credit.parkId}
                  >
                    {parks.map(park => (
                      <option key={park.id} value={park.id}>
                        {park.name}
                      </option>
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
                  onChange={handleFieldChange}
                  // onChange={(e) => setManufacturer(e.target.value)}
                >
                  {manufacturers.map(manufacturer => (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="alignRight">
              <button
                type="button"
                disabled={isLoading}
                onClick={createNewCredit}
                id="newCreditFormBtn"
                className="ui blue basic button"
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default AddNewCreditForm;
