import React, { useState, useEffect } from "react";
import trackTypeManager from "../../modules/tracktypes/trackTypeManager";
import parkManager from "../../modules/parks/parkManager";
import manufacturerManager from "../../modules/manufacturers/manfacturerManager";
import rollerCoasterManager from "../../modules/rollerCoasters/rollerCoasterManager";
import { confirmAlert } from "react-confirm-alert";

import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./AddPark.css";
const remoteUrl = process.env.REACT_APP_BASE_URL;

const AddPark = (props) => {
  console.log(props);
  const [park, setPark] = useState({});
  const addNewPark = async (token, parkObj) => {
    try {
      const response = await fetch(`${remoteUrl}/parks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parkObj),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log({ jsonResponse });
          setPark(jsonResponse);
          alert(`Thanks For Adding ${jsonResponse.name} to the database. You may now select it as an option.`)
          props.history.push('/new/rollercoaster');
      }
      throw new Error("Verify Email Request Failed");
    } catch (err) {
      console.info(err);
    }
  };
  return (
    <>
      <div className="add_new_park_form_container">
        <form className="new_form" id="form_container" onSubmit={addNewPark}>
          <div className="fieldset_container">
            <fieldset className="new_form">
              <label className="new_form" htmlFor="name">Park Name:{" "}</label>
              <input
                required
                className="new_form"
                id="name"
                type="text"
                name="name"
                value={park.name}
                onChange={(e) => setPark(e.target.value)}

              />
            </fieldset>
          </div>

          <div className="fieldset_container">
            <fieldset className="new_form">
              <label className="new_form" htmlFor="parkLocation">Park State/Providence:{" "}</label>
              <input
                required
                className="new_form"
                id="parkLocation"
                type="text"
                name="parkLocation"
                value={park.parkLocation}
                onChange={(e) => setPark(e.target.value)}

              />
            </fieldset>
          </div>

          <div className="fieldset_container">
            <fieldset className="new_form">
              <label className="new_form" htmlFor="country">Park Country:{" "}</label>
              <input
                required
                className="new_form"
                id="country"
                type="text"
                name="country"
                value={park.country}
                onChange={(e) => setPark(e.target.value)}
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
            <i className="far fa-copyright"></i>
          </p>
        </div>
      </div>
    </>
  );
};

export default AddPark;
