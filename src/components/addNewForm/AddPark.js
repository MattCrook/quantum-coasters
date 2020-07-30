import React, { useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./AddPark.css";


const remoteUrl = process.env.REACT_APP_BASE_URL;

const AddPark = (props) => {
  const [name, setName] = useState();
  const [parkLocation, setParkLocation] = useState();
  const [parkCountry, setParkCountry] = useState();

  const addNewPark = async (token, parkObj) => {
    try {
      const response = await fetch(`${remoteUrl}/parks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(parkObj),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error(`Failed to add Park - ${name}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPark = {
      name: name,
      parkLocation: parkLocation,
      parkCountry: parkCountry,
    };

    const Auth0Token = localStorage.getItem("accessToken");
    // const rest_auth_token = sessionStorage.getItem("QuantumToken");

      addNewPark(Auth0Token, newPark).then(() => {
      alert(`Thanks For Adding ${name} to the database. You may now select it as an option.`);
      props.history.push("/new/rollercoaster");
    });
  };

  return (
    <>
      <div className="nav_banner_rollercoaster_select">
        <div className="navbar_brand_logo">
          <div id="quantum_logo">Quantum Coasters</div>
        </div>
        <div className="back_btn_container_select_rollercoaster">
          <button
            className="go_back_to_ridelist_btn"
            onClick={() => props.history.push("/new/rollercoaster")}
          >
            <i className="fas fa-step-backward"></i>Back
          </button>
        </div>
      </div>

      <div className="add_new_park_form_container">
        <form className="new_form" id="form_container" onSubmit={handleSubmit}>
          <div className="add_new_park_form_title">Add New Park</div>
          <div id="park_name_label" className="fieldset_container">
            <fieldset className="new_form">
              <label id="add_park_label" className="new_form" htmlFor="name">
                Park Name:{" "}
              </label>
              <input
                required
                className="new_form"
                id="name"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </fieldset>
          </div>

          <div className="fieldset_container">
            <fieldset className="new_form">
              <label
                id="add_park_label"
                className="new_form"
                htmlFor="parkLocation"
              >
                Park State/Providence:{" "}
              </label>
              <input
                required
                className="new_form"
                id="parkLocation"
                type="text"
                name="parkLocation"
                onChange={(e) => setParkLocation(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="fieldset_container">
            <fieldset className="new_form">
              <label id="add_park_label" className="new_form" htmlFor="country">
                Park Country:{" "}
              </label>
              <input
                required
                className="new_form"
                id="country"
                type="text"
                name="country"
                onChange={(e) => setParkCountry(e.target.value)}
              />
            </fieldset>
          </div>

          <input
            className="new_form"
            id="create_park_btn"
            type="submit"
            value="Create"
          />
        </form>

        <div className="signature">
          <p>
            Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
            <i className="fas fa-trademark"></i>
          </p>
        </div>
      </div>
    </>
  );
};

export default AddPark;
