import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./styles/FeedbackModal.css";
import "./styles/BugModal.css"

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
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

const BugReportModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal
      id="feedback_modal"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.bugReportModalOpen}
      onClose={props.handleCloseBugReport}
      onSubmit={props.handleSubmitBug}
    >
      <div style={modalStyle} className={classes.paper}>
        <div className="bug_header">
          <div className="bug_title">Submit Bug Form</div>
          <button className="feedback_modal_close" onClick={props.handleCloseBugReport}></button>
        </div>

        <form className="feedback_form">
          <div className="feedback_row_wrapper">
            <label className="feedback_form_label" htmlFor="subject">
              Title:
            </label>
            <input className="feedback_input" id="subject" ref={props.bugTitle} required autoFocus />
            <div className="feedback_form_ul">
              <li className="feedback_list_item">
                Please provide a short, descriptive title for the subject of your bug description.{" "}
              </li>
            </div>
          </div>
          <div className="feedback_row_wrapper">
            <label className="feedback_form_label" htmlFor="feedback">
              Description:
            </label>
            <textarea className="feedback_input" id="feedback" ref={props.bugDescription} required />
            <div className="feedback_form_ul">
              <li className="feedback_list_item">Tell us the bug you found.</li>
              <li className="feedback_list_item">Be as specific as possible!</li>
              <li className="feedback_list_item">For example, what went wrong, how are you stuck, what do you think caused the bug, how can we reproduce, etc...</li>
            </div>
          </div>

          <button id="submit_feedback_btn" type="submit">Submit</button>
        </form>
        <div id="signature_modal" className="signature">
          <p id="signature_font_modal">
            Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default BugReportModal;
