import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import "./Plan.css";


const Calendar = (props) => {
    console.log(props)
    const { today, d, day, month, year, setDate } = props;
    const isToday = d === today.getDate();
    const isSelected = d === day;


    return (
        <div id="calendarDays" className="calendar_days" onClick={() => setDate(new Date(year, month, d))}>
            {d > 0 ? d : ""}

        </div>
    )
}

export default Calendar;
