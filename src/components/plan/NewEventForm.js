import React, { useState, useEffect } from "react";
import Reminders from "./Reminders";
import "./Plan.css";

const NewEventForm = (props) => {
  const [isReminder, setIsReminder] = useState(false);
  const currentDate = sessionStorage.getItem("CalendarDateIsSelected");
//   console.log(isReminder);

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
          <div className="event_form_header">
            <div className="current_date_event_form">{currentDate}</div>
            <div className="cancel" onClick={() => props.history.push("/plan")}>Cancel</div>
          </div>
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

          <div id="master_reminders_container">
            <div id="reminders_container_radios">
              <div className="set_reminders_title">Set Reminders: </div>
              <div className="radio_btn_container">
                <ul className="reminders_ul">
                  <li className="set_reminders">
                    <input
                      type="radio"
                      id="no_reminders"
                      name="is_reminder_set"
                      value="False"
                      onClick={() => setIsReminder(false)}
                    />
                    <label htmlFor="no_reminders">No Reminders</label>
                    <div className="check"></div>
                  </li>
                  <li className="set_reminders">
                    <input
                      type="radio"
                      id="reminders"
                      name="is_reminder_set"
                      value="True"
                      onClick={() => setIsReminder(true)}
                    />
                    <label htmlFor="reminders">Set A Reminder</label>
                    <div className="check"></div>
                  </li>
                </ul>
              </div>
            </div>
            <div id="reminders_container_toggles">
              <Reminders authUser={props.authUser} userProfile={props.userProfile} {...props} />
            </div>
          </div>

          <button id="new_event_cal_save_btn" type="submit">
            Save
          </button>
        </form>
      </div>
      <div className="signature">
        <p id="signature_font">
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};
export default NewEventForm;
