import React, { useState, useEffect } from "react";
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
  parseISO,
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
    onDateClick(parsedDate);
    MicroModal.init({
      openTrigger: "data-micromodal-trigger",
      closeTrigger: "data-micromodal-close",
      openClass: "is-open",
      disableScroll: true,
      disableFocus: false,
      awaitOpenAnimation: true,
      awaitCloseAnimation: false,
      debugMode: true,
    });
    setIsDaySelected(parsedDate);
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

  function startEndDateRecursion(arr, min, max) {
    if (min > max) return false;
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

// const Plan = (props) => {
//   const { loading, user, logout, clearStorage, isAuthenticated } = useAuth0();
//   const { getCurrentUserActivity, postActivityLogAddCredit, postActivityLogEditProfile } = useActivityLog();
//   const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png";
//   const { authUser } = props;
//   const { userProfile } = props;
//   const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const YEARS = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];
//   const WEEKDAYS = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
//   const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//   const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//   const today = new Date();
//   const [date, setDate] = useState(today);
//   const [day, setDay] = useState(date.getDate());
//   const [month, setMonth] = useState(date.getMonth());
//   const [year, setYear] = useState(date.getFullYear());
//   const [startDay, setStartDay] = useState(calculateStartDayOfMonth(date));
//   console.log(day);
//   console.log(month);
//   console.log(year);
//   console.log(date);
//   console.log(DAYS);

//   function calculateStartDayOfMonth(date) {
//     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//   }

//   const isLeapYear = (year) => {
//     return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
//   };

//   const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;
//   console.log([days[month] + (startDay - 1)])

//   const handleChangeMonth = (e) => {
//     const stateToChange = { ...month };
//     console.log(stateToChange);
//     stateToChange[e.target.id] = e.target.value;
//     console.log(stateToChange);
//     setMonth(stateToChange);
//   };

//   const handleChangeYear = (e) => {
//     const stateToChange = { ...year };
//     stateToChange[e.target.id] = e.target.value;
//     setMonth(stateToChange);
//   };

//   useEffect(() => {
//     const initCalendar = () => {
//       setDay(date.getDate());
//       setMonth(date.getMonth());
//       setYear(date.getFullYear());
//       setStartDay(calculateStartDayOfMonth(date));
//     };
//     initCalendar();
//   }, [date]);

//   return (
//     <>
//       <nav id="nav-container" className="navbar is-dark">
//         <div className="leaderboard_container_1">
//           <button id="quantum_logo_leaderboard" className="navbar-item" onClick={() => props.history.push("/home")}>
//             Quantum Coasters
//           </button>
//         </div>

//         <div className="leaderboard_container_2">
//           <div className="leaderboard-name">
//             <p className="leaderboard-first-and-last-name-in-nav">
//               {authUser.first_name} {authUser.last_name}
//             </p>
//             {!loading && userProfile.image ? (
//               <img id="profile-pic" src={userProfile.image.image} alt="My Avatar" />
//             ) : (
//               <img id="google-profile-pic" src={defaultQPicture} alt="My Avatar" />
//             )}

//             <button
//               onClick={() => logout({ returnTo: window.location.origin }, clearStorage())}
//               className="logout-navbar-item"
//               data-testid="logout-btn-testid"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="calendar_container">
//         <div className="calendar_header">
//           <select className="cal_change_year">
//             Year
//             {YEARS.map((y, i) => (
//               // <option key={i} className="cal_year_option" onClick={() => setYear(new Date(y, month, day))}>
//               <option key={y} id={y} className="cal_year_option">
//                 {y}
//               </option>
//             ))}
//           </select>
//           <div className="cal_title">Calendar</div>
//           <select className="cal_change_month" onChange={handleChangeMonth}>
//             Month
//             {MONTHS.map((m, i) => (
//               // <option className="cal_month_option" key={i} onClick={setMonth(new Date(year, m, day))}>
//               <option key={m} id={i} className="cal_month_option">
//                 {m}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="weekdays">
//           {WEEKDAYS.map((weekday, i) => (
//             <div key={weekday} className="weekday">
//               {weekday}
//             </div>
//           ))}
//         </div>

//         <div className="calendar_body_container">
//           {Array(days[month] + (startDay - 1))
//             .fill(null)
//             .map((_, index) => {
//               return (
//                 <Calendar
//                   key={index}
//                   year={year}
//                   month={month}
//                   today={today}
//                   day={day}
//                   d={index - (startDay - 2)}
//                   setDate={setDate}
//                 />
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };
// export default Plan;
