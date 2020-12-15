import React from "react";
import Event from "./Event";
import "./Plan.css";

const Calendar = (props) => {
  const { isDaySelected, userCalendarEvents, authUser, userProfile } = props;

  const formatDateToUserString = (date) => {
    date = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleString("en-US", options);
  };

  const dateTime = formatDateToUserString(isDaySelected);

  const initAddEventForm = () => {
    sessionStorage.setItem("CalendarDateIsSelected", isDaySelected);
    props.history.push("/plan/calendar/event");
  };

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

          <main className="modal__content_cal" id="modal-cal-content">
            <div className="new_form" id="cal_modal">
              {userCalendarEvents && userCalendarEvents.length > 0 ? (
                <div className="new_form" id="cal_modal_content">
                  {userCalendarEvents.map((event) => (
                    <Event key={event.id} event={event} authUser={authUser} userProfile={userProfile} {...props} />
                  ))}
                </div>
              ) : (
                <div className="no_events">No Events</div>
              )}
            </div>
            <footer className="modal__footer">
              <button
                className="add_item_btn"
                id="cal_modal__btn-primary"
                onClick={() => initAddEventForm()}
                style={{ marginRight: "8px" }}
              >
                Add Item <i className="fas fa-plus"></i>
              </button>
            </footer>
            <div className="signature">
              <p id="signature_font">
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
