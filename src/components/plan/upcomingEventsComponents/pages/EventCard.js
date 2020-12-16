import React from "react";

const EventCard = (props) => {
  const { upcomingEvent } = props;
  const eventDate = upcomingEvent.date;
  const fullDate = new Date(eventDate);
  let options = { year: "numeric", month: "short", day: "numeric", weekday: "short" };
  const formattedDate = fullDate.toLocaleString("en-US", options);

  return (
    <>
      <div className="upcoming_event_card_container">
        <div className="upcoming_event_card_date">{formattedDate}</div>
        <div className="upcoming_event_card_title">{props.upcomingEvent.title}</div>
        {/* <div className="upcoming_event_card_location">{props.upcomingEvent.location}</div> */}
        {/* <div className="upcoming_event_card_description">{props.upcomingEvent.description}</div> */}
        {/* <div className="upcoming_event_card_start_time">{props.upcomingEvent.start_time}</div>
        <div className="upcoming_event_card_end_time">{props.upcomingEvent.end_time}</div> */}
      </div>
    </>
  );
};

export default EventCard;
