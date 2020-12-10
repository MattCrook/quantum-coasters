import React, { useState } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import Calendar from "./Calendar";
import MicroModal from "micromodal";
import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import "./Plan.css";

const Plan = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { loading, user, logout, clearStorage, isAuthenticated } = useAuth0();
  const { getCurrentUserActivity, postActivityLogAddCredit, postActivityLogEditProfile } = useActivityLog();
  const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png";
  const { authUser } = props;
  const { userProfile } = props;
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const YEARS = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  const WEEKDAYS = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const today = new Date();
  const [date, setDate] = useState(today);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [isDaySelected, setIsDaySelected] = useState(null);

  const handleDayClick = (e) => {
    let eventId = e.target.id;
    let eventIdDate = new Date(eventId);
    const options = { year: "numeric", month: "long", day: "numeric" };
    let parsedDate = eventIdDate.toLocaleString("en-US", options);
   //  onDateClick(parsedDate);
   setIsDaySelected(parsedDate);
    MicroModal.init({
      openTrigger: "data-micromodal-trigger",
      closeTrigger: "data-micromodal-close",
      // openClass: "is-open",
      disableScroll: true,
      disableFocus: false,
      awaitOpenAnimation: true,
      awaitCloseAnimation: false,
      debugMode: true,
    });
  };

  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="icon" onClick={prevMonth}>
          chevron_left
        </div>
        <span>{format(currentDate, dateFormat)}</span>
        <div className="icon" onClick={nextMonth}>
          chevron_right
        </div>
      </div>
    );
  };

  const days = () => {
    const daysOfTheWeek = WEEKDAYS.map((day) => {
      return (
        <div className="column day" key={day}>
          {day}
        </div>
      );
    });
    return <div className="days row">{daysOfTheWeek}</div>;
  };

  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <>
            <div
              className={`column cell ${
                !isSameMonth(day, monthStart) ? "disabled" : isSameDay(day, selectedDate) ? "selected" : ""
              }`}
              key={day}
              id={day.toDateString()}
              onClick={(e) => handleDayClick(e)}
              data-micromodal-trigger="modal-cal"
            >
              <span id={day.toDateString()} className="number">
                {formattedDate}
              </span>
              <span id={day.toDateString()} className="bg">
                {formattedDate}
              </span>
            </div>
            <Calendar
              today={today}
              formattedDate={formattedDate}
              date={date}
              day={day}
              year={year}
              month={month}
              isDaySelected={isDaySelected}
              selectedDate={selectedDate}
              {...props}
            />
          </>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {" "}
          {days}{" "}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  function nextMonth() {
    setCurrentDate(addMonths(currentDate, 1));
  }

  function prevMonth() {
    setCurrentDate(subMonths(currentDate, 1));
  }

  function onDateClick(day) {
    setSelectedDate(day);
  }

  return (
    <>
      <nav id="nav-container" className="navbar is-dark">
        <div className="leaderboard_container_1">
          <button id="quantum_logo_leaderboard" className="navbar-item" onClick={() => props.history.push("/home")}>
            Quantum Coasters
          </button>
        </div>

        <div className="leaderboard_container_2">
          <div className="leaderboard-name">
            <p className="leaderboard-first-and-last-name-in-nav">
              {authUser.first_name} {authUser.last_name}
            </p>
            {!loading && userProfile.image ? (
              <img id="profile-pic" src={userProfile.image.image} alt="My Avatar" />
            ) : (
              <img id="google-profile-pic" src={defaultQPicture} alt="My Avatar" />
            )}

            <button
              onClick={() => logout({ returnTo: window.location.origin }, clearStorage())}
              className="logout-navbar-item"
              data-testid="logout-btn-testid"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="calendar_container">
        <div className="calendar_header">
          <select className="cal_change_year">
            <option>Year</option>
            Year
            {YEARS.map((y, i) => (
              <option key={i} className="cal_year_option" value={y}>
                {y}
              </option>
            ))}
          </select>
          <div className="cal_title">Calendar</div>
          <select className="cal_change_month">
            Month
            <option>Month</option>
            {MONTHS.map((m, i) => (
              <option key={i} className="cal_month_option" value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="calendar">
          <div id="header">{header()}</div>
          <div>{days()}</div>
          <div>{cells()}</div>
        </div>
      </div>
    </>
  );
};
export default Plan;
