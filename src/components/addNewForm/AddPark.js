import React, { useState } from "react";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import NavHeader from "../nav/NavHeader";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./AddPark.css";

const remoteUrl = process.env.REACT_APP_REMOTE_API_URL;

const AddPark = (props) => {
  const [name, setName] = useState();
  const [parkLocation, setParkLocation] = useState();
  const [parkCountry, setParkCountry] = useState();
  const { postNewParkActivityLog } = useActivityLog();
  const { postNewErrorLog } = useErrorLog();

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
      return await response.json();
    } catch (err) {
      console.log(err);
      await postNewErrorLog(err, "AddPark.js", "addNewPark - API call");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPark = {
      name: name,
      parkLocation: parkLocation,
      parkCountry: parkCountry,
    };

    const token = sessionStorage.getItem("accessToken");

    addNewPark(token, newPark).then(() => {
      alert(`Thanks For Adding ${name} to the database. You may now select it as an option.`);
      postNewParkActivityLog(e.currentTarget, props.authUser.id).then(() => {
        props.history.push("/new/rollercoaster");
      });
    });
  };


  return (
    <>
      <NavHeader {...props} />
      <button className="back_to_previous" onClick={() => props.history.push("/new/rollercoaster")}>
        &lt; Back To Previous
      </button>
      <div className="add_new_park_form_container">
        <form className="ew_form" id="form_container" onSubmit={handleSubmit}>
          <div className="add_new_park_form_title">Add New Park</div>
          <div id="park_name_label" className="fieldset_container_add_park">
            <fieldset className="add_park_new_form">
              <label id="add_park_label" className="new_form" htmlFor="name">
                Park Name:{" "}
              </label>
              <input
                required
                className="add_park_new_form"
                id="name"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex) Six Flags Magic Mountain, Cedar Point, Europa Park, etc..."
              />
            </fieldset>
          </div>

          <div className="fieldset_container_add_park">
            <fieldset className="add_park_new_form">
              <label id="add_park_label" className="new_form" htmlFor="parkLocation">
                Park State/Providence:{" "}
              </label>
              <input
                required
                className="add_park_new_form"
                id="parkLocation"
                type="text"
                name="parkLocation"
                onChange={(e) => setParkLocation(e.target.value)}
                placeholder="Ex) Ohio, California, etc..."
              />
            </fieldset>
          </div>

          <div className="fieldset_container_add_park">
            <fieldset className="add_park_new_form">
              <label id="add_park_label" className="new_form" htmlFor="country">
                Park Country:{" "}
              </label>
              <input
                required
                className="add_park_new_form"
                id="country"
                type="text"
                name="country"
                onChange={(e) => setParkCountry(e.target.value)}
                placeholder="Ex) USA, Germany, UK, etc..."
              />
            </fieldset>
          </div>

          <input id="create_park_btn" type="submit" value="Create" />
          <div className="signature">
            <p id="signature_add_park_form">
              Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPark;
