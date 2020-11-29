import React, { useState, useEffect, useContext } from "react";
import { postActivityLog, getUserActivityLog } from "../modules/services/services";

export const ActivityLogContext = React.createContext();
export const useActivityLog = () => useContext(ActivityLogContext);

export const ActivityLogProvider = ({ children }) => {
    const [activityLog, setActivityLog] = useState([]);
    const [user, setUser] = useState([]);


    const postNewActivityLogAction = async (payload) => {
        const postAction = await postActivityLog(payload);
        setActivityLog(postAction);
    };

    const getCurrentUserActivity = async (userId) => {
        const currentUserActivity = await getUserActivityLog(userId);
        setActivityLog(currentUserActivity);
    }


    return (
        <ActivityLogContext.Provider
            value={{
                postNewActivityLogAction,
                getCurrentUserActivity,
                activityLog,

            }}
        >
            {children}
        </ActivityLogContext.Provider>
    )
};
