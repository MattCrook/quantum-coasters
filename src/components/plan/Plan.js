import React, { useState, useEffect } from "react";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import Calendar from "./calendarComponents/Calendar";
import NavHeader from "../nav/NavHeader";
import UpcomingEvents from "./upcomingEventsComponents/UpcomingEvents";
import MicroModal from "micromodal";
import calendarManager from "../../modules/calendar/calendarManager";
import SelectYearDropdown from "./calendarComponents/SelectYear";
import SelectMonthDropdown from "./calendarComponents/SelectMonth";
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

  // const { getCurrentUserActivity, postActivityLogAddCredit, postActivityLogEditProfile } = useActivityLog();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userCalendarEvents, setUserCalendarEvents] = useState([]);
  const { postNewErrorLog } = useErrorLog();
  const today = new Date();
  const [date, setDate] = useState(today);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [isDaySelected, setIsDaySelected] = useState(null);
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const YEARS = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  const WEEKDAYS = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];


  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const onDateClick = (day) => setSelectedDate(day);

  const isEventsForDate = (userEvents, day) => {
      let dateFormat = "yyyy-M-dd";
    let formattedDate = format(day, dateFormat);
      let matches = [];
      userEvents.forEach((event) => {
        if (event.date.length > 0 && event.date === formattedDate) {
          matches.push(event.date);
        }
      });
      return matches;
  };

  const handleDayClick = (e) => {
    try {
      let eventId = e.target.id;
      let eventIdDate = new Date(eventId);
      const options = { year: "numeric", month: "long", day: "numeric" };
      let parsedDate = eventIdDate.toLocaleString("en-US", options);
      onDateClick(parsedDate);
      setIsDaySelected(parsedDate);
      MicroModal.init({
        openTrigger: "data-micromodal-trigger",
        closeTrigger: "data-micromodal-close",
      });
    } catch (error) {
      postNewErrorLog(error, "Plan.js", "handleDayClick");
    }
  };

  const header = () => {
    try {
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
    } catch (error) {
      postNewErrorLog(error, "Plan.js", "header");
    }
  };

  const days = () => {
    try {
      const daysOfTheWeek = WEEKDAYS.map((day, i) => {
        return (
          <div className="column day" key={i}>
            {day}
          </div>
        );
      });
      return <div className="days row">{daysOfTheWeek}</div>;
    } catch (error) {
      postNewErrorLog(error, "Plan.js", "days");
    }
  };

  const cells = () => {
    try {
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
          const fullFormat = "yyyy-M-dd";
          const fullFormattedDate = format(day, fullFormat);
          const eventsForCurrentDay = isEventsForDate(userCalendarEvents, day);

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
                {userCalendarEvents && userCalendarEvents.length > 0 && eventsForCurrentDay[0] === fullFormattedDate ? (
                  <span className="has_events">0</span>
                ) : null}
              </div>
              <Calendar
                key={day.toDateString()}
                today={today}
                formattedDate={formattedDate}
                date={date}
                day={day}
                year={year}
                month={month}
                isDaySelected={isDaySelected}
                selectedDate={selectedDate}
                currentDate={currentDate}
                userCalendarEvents={userCalendarEvents}
                authUser={props.authUser}
                userProfile={props.userProfile}
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
    } catch (error) {
      console.log(error);
      postNewErrorLog(error, "Plan.js", "cells");
    }
  };


  useEffect(() => {
    const userCalendar = async () => {
      const userEvents = await calendarManager.getUserCalendarEvents(props.authUser.id);
      setUserCalendarEvents(userEvents);
    };
    userCalendar();
  }, [props]);


  return (
    <>
      <NavHeader {...props} />
      <div id="plan_container">
        <UpcomingEvents
          userCalendarEvents={userCalendarEvents}
          currentYear={year}
          currentMonth={month}
          currentDate={currentDate}
          {...props}
        />
        <div className="calendar_container">
          <div className="calendar_header">
            <div className="cal_change_year">
              <SelectYearDropdown
                options={YEARS}
                label={"Years"}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                {...props}
              />
            </div>
            <div className="cal_title">Calendar</div>
            <div className="cal_change_month">
              <SelectMonthDropdown
                options={MONTHS}
                label={"Months"}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                {...props}
              />
            </div>
          </div>
          <div className="calendar">
            <div id="header">{header()}</div>
            <div>{days()}</div>
            <div>{cells()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
