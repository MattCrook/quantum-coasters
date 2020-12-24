import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../../contexts/react-auth0-context";
// import { useActivityLog } from "../../../contexts/ActivityLogContext";
import { useAuthUser } from "../../../contexts/AuthUserContext";
import { useErrorLog } from "../../../contexts/ErrorLogContext";
import EventCard from "./pages/EventCard";

const UpcomingEvents = (props) => {
  const { loading, isAuthenticated } = useAuth0();
  // const { getCurrentUserActivity, postActivityLogAddCredit, postActivityLogEditProfile } = useActivityLog();
  const { authToken } = useAuthUser();
  const { postNewErrorLog } = useErrorLog();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { userCalendarEvents, currentYear, currentMonth, currentDate } = props;

  const eventsInCurrentYear = (userEvents, presentYear) => {
    try {
      const filteredEvents = [];
      userEvents.forEach((event) => {
        const eventDate = event.date;
        const yearOfEvent = eventDate.split("-")[0];
        if (presentYear.toString() === yearOfEvent) {
          filteredEvents.push(event);
        }
      });
      return filteredEvents;
    } catch (error) {
      postNewErrorLog(error, "UpcomingEvents.js", "eventsInCurrentYear");
    }
  };

  const eventsInCurrentMonth = (userEvents, presentYear) => {
    try {
      const events = eventsInCurrentYear(userEvents, presentYear);
      const upcomingSoonEvents = [];
      events.forEach((event) => {
        const eventDate = event.date;
        const eventMonth = eventDate.split("-")[1];
        const presentMonth = currentMonth + 1;
        const parsedPresentMonth = presentMonth.toString();
        if (eventMonth === parsedPresentMonth) {
          upcomingSoonEvents.push(event);
        }
      });
      return upcomingSoonEvents;
    } catch (error) {
      postNewErrorLog(error, "UpcomingEvents.js", "eventsInCurrentMonth");
    }
  };

  const populateUpComingEvents = (userEvents, presentYear) => {
    try {
      const events = eventsInCurrentMonth(userEvents, presentYear);
      const upcomingEventsWithin5Days = [];
      events.forEach((event) => {
        const eventFullDate = event.date;
        const eventDay = parseInt(eventFullDate.split("-")[2]);
        const presentDay = currentDate.getDate();
        if (eventDay >= presentDay && eventDay - presentDay <= 5) {
          upcomingEventsWithin5Days.push(event);
        }
      });
      return upcomingEventsWithin5Days;
    } catch (error) {
      postNewErrorLog(error, "UpcomingEvents.js", "populateUpComingEvents");
    }
  };

  useEffect(() => {
    const upcomingUserEvents = populateUpComingEvents(userCalendarEvents, currentYear);
    setUpcomingEvents(upcomingUserEvents);
  }, [userCalendarEvents, currentYear]);

  return (
    <div className="upcoming_cal_events_main_container">
      <div className="upcoming_events_title_container">
        <div className="upcoming_title">Upcoming Events</div>
        <button className="add_event_btn_upcoming_events" onClick={() => props.history.push("plan/calendar/event")}>
          {" "}
          <i className="far fa-calendar-plus"></i>
        </button>
      </div>
      {!loading &&
        isAuthenticated &&
        authToken &&
        upcomingEvents.map((upcomingEvent) => <EventCard key={upcomingEvent.id} upcomingEvent={upcomingEvent} />)}
      <div className="space_bottom"></div>
    </div>
  );
};

export default UpcomingEvents;
