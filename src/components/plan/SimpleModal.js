import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Reminders from "./Reminders";
import "./Plan.css";

// const rand = () => {
//   return Math.round(Math.random() * 20) - 10;
// };

const getModalStyle = () => {
  //   const top = 50 + rand();
  //     const left = 50 + rand();
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const handleHideModalBehindDeleteMessage = (props, e) => {
  props.hideModalBehindConfirmDelete();
  props.handleDeleteEvent(e);
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20%",
    marginTop: "20%",
  },
  paper: {
    position: "absolute",
    width: 750,
    backgroundColor: "rgb(37, 36, 36)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#e7e6e6",
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <button className="edit_cal_event_button" onClick={props.handleOpen}>
        <i className="far fa-edit"></i>
      </button>

      <Modal
        id="edit_cal_event_modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="cal_edit_event_header">
            <div className="cal_event_edit_title">Edit {props.event.title}</div>
            <button className="delete_cal_event" onClick={(e) => handleHideModalBehindDeleteMessage(props, e)}>
              <i className="fas fa-trash"></i>
            </button>
            <button className="modal_close_edit" onClick={props.handleClose}></button>
          </div>

          <form className="event_edit_form" onSubmit={props.handleUpdateEvent}>
            <div className="row_wrapper">
              <label className="event_form_label" htmlFor="title">
                Title:
              </label>
              <input
                className="event_form_input"
                id="title"
                value={props.currentEvent.title}
                onChange={(e) => props.handleUpdateInput(e)}
              />
            </div>

            <div className="row_wrapper">
              <label className="event_form_label" htmlFor="location">
                Location:
              </label>
              <input
                className="event_form_input"
                id="location"
                value={props.currentEvent.location}
                onChange={(e) => props.handleUpdateInput(e)}
              />
            </div>

            <div className="row_wrapper">
              <label className="event_form_label" htmlFor="description">
                Description:
              </label>
              <input
                className="event_form_input"
                id="description"
                value={props.currentEvent.description}
                onChange={(e) => props.handleUpdateInput(e)}
              />
            </div>
            <div id="start_end_row_wrapper">
              <label className="start_end_event_form_label" htmlFor="time">
                Time:
              </label>
              <div id="start_end_time">
                <div className="start">
                  Start:
                  <input
                    className="event_form_input"
                    id="start_time"
                    type="time"
                    value={props.currentEvent.start_time}
                    onChange={(e) => props.handleUpdateInput(e)}
                  />
                </div>
                <div className="end">
                  End:
                  <input
                    className="event_form_input"
                    id="end_time"
                    type="time"
                    value={props.currentEvent.end_time}
                    onChange={(e) => props.handleUpdateInput(e)}
                  />
                </div>
              </div>
            </div>

            <div id="master_reminders_container">
              <div id="reminders_container_radios">
                <div className="set_reminders_title">Set Reminders: </div>
                <div className="radio_btn_container">
                  <ul className="reminders_ul">
                    {props.isReminderSet === "True" ? (
                      <>
                        <li className="set_reminders">
                          <input
                            type="radio"
                            id="no_reminders"
                            name="is_reminder_set"
                            value="False"
                            onClick={() => props.setAddReminder(false)}
                            onChange={(e) => props.setIsReminderSet(e.target.value)}
                          />
                          <label htmlFor="no_reminders">No Reminders</label>
                          <div className="check"></div>
                        </li>

                        <li className="set_reminders">
                          <input
                            // checked
                            type="radio"
                            id="reminders"
                            name="is_reminder_set"
                            value="True"
                            onClick={() => props.setAddReminder(true)}
                            onChange={(e) => props.setIsReminderSet(e.target.value)}
                          />
                          <label htmlFor="reminders">Set A Reminder</label>
                          <div className="check"></div>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="set_reminders">
                          <input
                            // checked
                            type="radio"
                            id="no_reminders"
                            name="is_reminder_set"
                            value="False"
                            onClick={() => props.setAddReminder(false)}
                            onChange={(e) => props.setIsReminderSet(e.target.value)}
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
                            onClick={() => props.setAddReminder(true)}
                            onChange={(e) => props.setIsReminderSet(e.target.value)}
                          />
                          <label htmlFor="reminders">Set A Reminder</label>
                          <div className="check"></div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              {props.addReminder ? (
                <div id="reminders_container_toggles">
                  <Reminders
                    authUser={props.authUser}
                    userProfile={props.userProfile}
                    addReminder={props.addReminder}
                    setReminderValue={props.setReminderValue}
                    {...props}
                  />
                </div>
              ) : (
                <div id="reminders_container_toggles" style={{ opacity: "0.2" }}>
                  <Reminders
                    authUser={props.authUser}
                    userProfile={props.userProfile}
                    addReminder={props.addReminder}
                    setReminderValue={props.setReminderValue}
                    {...props}
                  />
                </div>
              )}
            </div>

            <button id="new_event_cal_save_btn" type="submit">
              Update
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
