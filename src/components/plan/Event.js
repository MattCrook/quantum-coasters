import React, { useState, useEffect } from "react";
import SimpleModal from "./SimpleModal";
import calendarManager from "../../modules/calendar/calendarManager";
import "./Plan.css";


const Event = (props) => {
  const { event, authUser, userProfile } = props;
  const startTime = event.start_time.split("");
  const start = startTime.slice(0, 5);
  const endTIme = event.end_time.split("");
  const end = endTIme.slice(0, 5);
  const [open, setOpen] = useState(false);
  const [addReminder, setAddReminder] = useState(false);
  const [isReminderSet, setIsReminderSet] = useState(false);
  const [reminderValue, setReminderValue] = useState(null);
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    location: "",
    description: "",
    start_time: "",
    end_time: "",
    reminder_value: "",
    is_reminder_set: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateInput = (e) => {
    const stateToChange = { ...currentEvent };
    stateToChange[e.target.id] = e.target.value;
    setCurrentEvent(stateToChange);
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    const updatedEvent = {
      id: currentEvent.id,
      title: currentEvent.title,
      location: currentEvent.location,
      description: currentEvent.description,
      startTime: currentEvent.start_time,
      endTime: currentEvent.end_time,
      reminderValue: reminderValue,
      isReminderSet: isReminderSet,
    };
    calendarManager
      .updateEvent(updatedEvent)
      .then(() => {
        sessionStorage.removeItem("CalendarDateIsSelected");
        props.history.push("/plan");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCurrentEvent(event);
    // if (event.is_reminder_set === "True") {
    //   setIsReminderSet(true);
    // }
  }, [event]);

  return (
    <>
      <div className="cal_event_content_container">
        <div className="start_end_container">
          <SimpleModal
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
            event={event}
            handleUpdateInput={handleUpdateInput}
            handleUpdateEvent={handleUpdateEvent}
            addReminder={addReminder}
            setAddReminder={setAddReminder}
            authUser={authUser}
            userProfile={userProfile}
            currentEvent={currentEvent}
            setIsReminderSet={setIsReminderSet}
            isReminderSet={isReminderSet}
            setReminderValue={setReminderValue}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            {...props}
          />
          <div className="event_start">{[...start]}</div> -<div className="event_end">{[...end]}</div>
        </div>
        <div className="event_title">{event.title}</div>
        <div className="event_location">{event.location}</div>
        <div className="event_description">{event.description}</div>
      </div>
    </>
  );
};

export default Event;
