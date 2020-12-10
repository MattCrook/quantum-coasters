import React from "react";
import "./Plan.css";

const NewEventForm = (props) => {
  return (
    <>
      <nav id="quantum_logo_add_event_form" className="navbar is-dark">
        <div>
          <button id="quantum_logo_title" className="navbar-item" onClick={() => props.history.push("/home")}>
            Quantum Coasters
          </button>
        </div>
      </nav>
      <div className="add_event_form_container">
        <div className="event_form_title">Add Calendar Event</div>
        <form className="add_event_form">
          <div className="cancel">Cancel</div>
          <div className="row_wrapper">
            <label className="event_form_label" htmlFor="title">
              Title:
            </label>
            <input className="event_form_input" id="title" />
          </div>

          <div className="row_wrapper">
            <label className="event_form_label" htmlFor="location">
              Location:
            </label>
            <input className="event_form_input" id="title" />
          </div>

          <div className="row_wrapper">
            <label className="event_form_label" htmlFor="description">
              Description:
            </label>
            <input className="event_form_input" id="title" />
          </div>
          <div className="row_wrapper">
            <label className="event_form_label" htmlFor="time">
              Time:
            </label>
            <input className="event_form_input" id="title" />
          </div>
          <button type="submit">Save</button>
        </form>
          </div>
          <div className="signature">
              <p id="signature_font">
                Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
                <i className="fas fa-trademark"></i>
              </p>
            </div>
    </>
  );
};
export default NewEventForm;
