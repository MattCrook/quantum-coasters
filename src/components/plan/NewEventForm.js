import React, { useState } from "react";
import Reminders from "./Reminders";
import calendarManager from "../../modules/calendar/calendarManager";
import TimePicker from "./Pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import "./Plan.css";

const NewEventForm = (props) => {
  const [addReminder, setAddReminder] = useState(false);
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [reminderValue, setReminderValue] = useState(null);
  const [isReminderSet, setIsReminderSet] = useState(false);

  const currentDate = sessionStorage.getItem("CalendarDateIsSelected");

  const handleEventFormSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: title,
      location: location,
      description: description,
      startTime: startTime,
      endTime: endTime,
      reminderValue: reminderValue,
      isReminderSet: isReminderSet,
    };
    calendarManager
      .postUserCalendarEvent(newEvent)
      .then(() => {
        // props.history.push("/plan");
      })
      .catch((err) => console.log(err));
  };

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
        <form className="add_event_form" onSubmit={handleEventFormSubmit}>
          <div className="event_form_header">
            <div className="current_date_event_form">{currentDate}</div>
            <div className="cancel" onClick={() => props.history.push("/plan")}>
              Cancel
            </div>
          </div>
          <div className="row_wrapper">
            <label className="event_form_label" htmlFor="title">
              Title:
            </label>
            <input className="event_form_input" id="title" onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="row_wrapper">
            <label className="event_form_label" htmlFor="location">
              Location:
            </label>
            <input className="event_form_input" id="location" onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="row_wrapper">
            <label className="event_form_label" htmlFor="description">
              Description:
            </label>
            <input className="event_form_input" id="description" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div id="start_end_row_wrapper">
            <label className="start_end_event_form_label" htmlFor="time">
              Time:
            </label>
            <div id="start_end_time">
              <div className="start">
                Start:
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Start Time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                {/* <input className="event_form_input" id="time" type="time" onChange={(e) => setStartTime(e.target.value)} /> */}
              </div>
              <div className="end">
                End:
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="End Time"
                      value={startTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                {/* <input
                  className="event_form_input"
                  id="time"
                  type="time"
                  onChange={(e) => setEndTime(e.target.value)}
                /> */}
              </div>
            </div>
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
                      onClick={() => setAddReminder(false)}
                      onChange={(e) => setIsReminderSet(e.target.value)}
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
                      onClick={() => setAddReminder(true)}
                      onChange={(e) => setIsReminderSet(e.target.value)}
                    />
                    <label htmlFor="reminders">Set A Reminder</label>
                    <div className="check"></div>
                  </li>
                </ul>
              </div>
            </div>
            {addReminder ? (
              <div id="reminders_container_toggles">
                <Reminders
                  authUser={props.authUser}
                  userProfile={props.userProfile}
                  addReminder={addReminder}
                  setReminderValue={setReminderValue}
                  {...props}
                />
              </div>
            ) : (
              <div id="reminders_container_toggles" style={{ opacity: "0.2" }}>
                <Reminders
                  authUser={props.authUser}
                  userProfile={props.userProfile}
                  addReminder={addReminder}
                  setReminderValue={setReminderValue}
                  {...props}
                />
              </div>
            )}
          </div>

          <button id="new_event_cal_save_btn" type="submit">
            Save
          </button>
        </form>
      </div>
      <div id="sig_new_event_form" className="signature">
        <p id="signature_font">
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};
export default NewEventForm;
