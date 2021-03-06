import React, { useRef } from "react";
import "../Plan.css";

const Reminders = (props) => {
  const oneWeekSwitch = useRef();
  const oneDaySwitch = useRef();
  const oneHourSwitch = useRef();

  const handleToggleSwitch = (e, themeSwitch, reminderValue) => {
    e.preventDefault();
    themeSwitch.current.classList.toggle("light-theme");
    props.setReminderValue(reminderValue);
  };

  return (
    <div className="reminders_container">
      <div className="reminder_switch_container">
        <div className="reminder_switch_title">1 Week Before</div>
        <div className="reminder_options">
          <div
            ref={oneWeekSwitch}
            className="theme-switch"
            onClick={(e) => handleToggleSwitch(e, oneWeekSwitch, "1 Week")}
          >
            <div className="switch"></div>
          </div>
        </div>
      </div>

      <div className="reminder_switch_container">
        <div className="reminder_switch_title">1 Day Before</div>
        <div className="reminder_options">
          <div
            ref={oneDaySwitch}
            className="theme-switch"
            onClick={(e) => handleToggleSwitch(e, oneDaySwitch, "1 Day")}
          >
            <div className="switch"></div>
          </div>
        </div>
      </div>

      <div className="reminder_switch_container">
        <div className="reminder_switch_title">1 Hour Before</div>
        <div className="reminder_options">
          <div
            ref={oneHourSwitch}
            className="theme-switch"
            onClick={(e) => handleToggleSwitch(e, oneHourSwitch, "1 Hour")}
          >
            <div className="switch"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reminders;
