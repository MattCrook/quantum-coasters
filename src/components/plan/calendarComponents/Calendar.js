import React, { useEffect, useState } from "react";
import Event from "./Event";
import "../Plan.css";

const Calendar = (props) => {
  const { isDaySelected, selectedDate, userCalendarEvents, authUser, userProfile } = props;
  const [events, setEvents] = useState([]);
  const [currentSelectedDay, setCurrentSelectedDay] = useState([]);
  const [eventsForDate, setEventsForDate] = useState([]);

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

  // Function to parse incoming date: Date is the currently selected date when user clicks
  // a date on calendar to brig up modal.
  // Default state is the current day, otherwise it is the date of the selected day for the modal.
  // Accepts the selected date passed from Plan held in state from the click handler,
  // Does (a lot) of formatting to get date to yyyy/mm/dd. Final format is output
  // Filters out all user's calendar events and matches them (their dates) to the date selected.
  // To populate modal of current day's selected events for the user, and match the dates of the event to the
  // days on the calendar.
  const eventDatesForDate = (userEvents, selectedDate) => {
    let date = new Date(selectedDate).toLocaleDateString("en-US").replace("/", "-");
    let parsedDate = date.split("-").reverse().join("-");
    let reversedDateMonthFirst = parsedDate.split("-").reverse().join("-");
    let parsedMonthFirstDate = reversedDateMonthFirst.replace("/", "-");
    let reversedDateYearFirst = parsedMonthFirstDate.split("-").reverse().join("-");
    const output = reversedDateYearFirst.replace(/(\d{4})-(\d\d)-(\d\d)/, "$1-$3-$2");
    setCurrentSelectedDay(output);

    let matches = [];
    userEvents.forEach((event) => {
      if (event && event.date && event.date === output) {
        matches.push(event.date);
      }
    });
    setEvents(matches);
  };

  useEffect(() => {
    eventDatesForDate(userCalendarEvents, selectedDate);
    const matchingEventsWithCurrentDay = () => {
      const calendarDayEvents = userCalendarEvents.filter((userEvent) => userEvent.date === currentSelectedDay);
      setEventsForDate(calendarDayEvents);
    };
    matchingEventsWithCurrentDay();
  }, [selectedDate, userCalendarEvents, currentSelectedDay]);


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
              {eventsForDate && eventsForDate.length > 0 && events[0] === currentSelectedDay ? (
                <div className="new_form" id="cal_modal_content">
                  {eventsForDate.map((event) => (
                    <Event
                      key={event.id}
                      event={event}
                      events={events}
                      authUser={authUser}
                      userProfile={userProfile}
                      {...props}
                    />
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
