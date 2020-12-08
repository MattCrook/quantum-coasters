import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import Calendar from "./Calendar";
import "./Plan.css";

const Plan = (props) => {
  const { loading, user, logout, clearStorage, isAuthenticated } = useAuth0();
  const { getCurrentUserActivity, postActivityLogAddCredit, postActivityLogEditProfile } = useActivityLog();
  const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png";
  const { authUser } = props;
  const { userProfile } = props;
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const YEARS = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  const WEEKDAYS = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(calculateStartDayOfMonth(date));

  function calculateStartDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

  useEffect(() => {
    const initCalendar = () => {
      setDay(date.getDate());
      setMonth(date.getMonth());
      setYear(date.getFullYear());
      setStartDay(calculateStartDayOfMonth(date));
    };
    initCalendar();
  }, [date]);

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
            Year
            {YEARS.map((y, i) => (
              //   <option key={i} className="cal_year_option" onClick={() => setYear(new Date(year, month - 1, day))}>
              <option key={i} className="cal_year_option">
                {y}
              </option>
            ))}
          </select>
          <div className="cal_title">Calendar</div>
          <select className="cal_change_month">
            Month
            {MONTHS.map((m, i) => (
              //   <option className="cal_month_option" key={i} onClick={setMonth(new Date(year, month - 1, day))}>
              <option className="cal_month_option" key={i}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="weekdays">
          {WEEKDAYS.map((weekday, i) => (
            <div key={i} className="weekday">
              {weekday}
            </div>
          ))}
        </div>

        <div className="calendar_body_container">
          {DAYS && DAYS.length > 0 ? (
            Array(days[month] + (startDay - 1))
              .fill(null)
              .map((_, index) => (
                <Calendar
                  key={index}
                  year={year}
                  month={month}
                  today={today}
                  day={day}
                  d={index - (startDay - 2)}
                  setDate={setDate}
                />
              ))
          ) : (
            <div className="loading_container">
              <div className="loading_pop_up">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Plan;

//   const [calendar, setCalendar] = useState([]);
//   const [daysInCurrentMonth, setDaysInCurrentMonth] = useState([]);
//   const [startingDay, setStartingDay] = useState([]);
//   const [date, setDate] = useState();
//   const [weekdays, setWeekDays] = useState(["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]);
//   const [initialDate, setInitialDate] = useState([]);
//   const [currentDay, setCurrentDay] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState([]);
//   const [currentYear, setCurrentYear] = useState([]);
//   const [months, setMonths] = useState([
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ]);
//   const [years, setYears] = useState(["2016", "2017", "2018", "2019", "2020", "2021", "2022"]);
//   const [date, setDate] = useState(new Date());

//   const renderCalendar = () => {
// setInitialDate(currentDayData.today);
// setCurrentDay(currentDayData.day);
// setCurrentMonth(currentDayData.month);
// setCurrentYear(currentDayData.year);
// const days = daysInMonth(currentDayData.month, currentDayData.year);
// setDaysInCurrentMonth(days);
// console.log({ days });
// const startingDayOfWeek = today.getDay(); // find where to start calendar day of week
// setStartingDay(startingDayOfWeek);
// console.log({ startingDayOfWeek });
//   };

//   const renderCalendar = () => {
//     const currentDayData = initialCalendarLoadData();
//     setDaysInCurrentMonth(currentDayData.days);
//     setStartingDay(currentDayData.startDay);
//   };

//   const initCalendar = () => {
//     renderCalendar();
//   };

//   const daysInMonth = (month, year) => {
//     const d = new Date(year, month + 1, 0);
//     return d.getDate();
//   };

//   useEffect(() => {
//     const initialCalendarLoadData = () => {
//       const today = new Date();
//       const d = today.getDay();
//       const m = today.getMonth();
//       const y = today.getFullYear();
//       const days = daysInMonth(m, y);
//       setDaysInCurrentMonth([days]);
//       const startingDayOfWeek = today.getDay();
//       setStartingDay(startingDayOfWeek);
//       const dateInfo = {
//         day: d,
//         month: m,
//         year: y,
//         days: days,
//         startDay: startingDayOfWeek,
//         today: today,
//       };
//       setDate(dateInfo);
//     };
//     initialCalendarLoadData();
//   }, []);
