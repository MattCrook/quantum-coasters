import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import "./Plan.css";

const Calendar = (props) => {
  const dateTimeSelected = props.selectedDate;
  const formatDateToUserString = (date) => {
    date = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleString("en-US", options);
  };
  const dateTime = formatDateToUserString(dateTimeSelected);

  const dayFromSubmit = () => "submit";

  return (
    <div className="modal micromodal-slide" id="modal-cal" aria-hidden="true">
      <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
        <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-cal-title">
          <header className="modal__header">
            <h2 className="modal__title" id="modal-cal-title">
              {dateTime}
            </h2>
            <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>

          <main className="modal__content" id="modal-cal-content">
            <div className="new_form" id="cal_modal">
              <div className="fieldset_container">
                <div className="new_form" id="cal_modal">
                  <div>Event 1</div>
                  <div>Event 2</div>
                  <div>Event 3</div>
                </div>
              </div>
            </div>
            <footer className="modal__footer">
              <button id="cal_modal__btn-primary" type="submit" style={{ marginRight: "8px" }}>
                Add Item
              </button>
            </footer>
            <div className="signature">
              <p>
                Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
                <i className="fas fa-trademark"></i>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
