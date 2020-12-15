import React, { useState, useContext } from "react";
import { postActivityLog, getUserActivityLog } from "../modules/services/services";

export const ActivityLogContext = React.createContext();
export const useActivityLog = () => useContext(ActivityLogContext);

export const ActivityLogProvider = ({ children }) => {
  const [activityLog, setActivityLog] = useState([]);
  const [actions, setActions] = useState([]);

  const postNewActivityLogAction = async (payload) => {
    const postAction = await postActivityLog(payload);
    setActivityLog(postAction);
  };

  const getCurrentUserActivity = async (userId) => {
    const currentUserActivity = await getUserActivityLog(userId);
    setActivityLog(currentUserActivity);
    console.log(currentUserActivity.length);

    if (currentUserActivity && currentUserActivity.length > 1) {
      const allUserActions = [];
      for (let a of currentUserActivity) {
        const parsedAction = JSON.parse(a.action);
        allUserActions.push(parsedAction);
      }
      setActions(allUserActions);
    } else {
      const a = currentUserActivity[0].action;
      const parsedAction = JSON.parse(a);
      setActions(parsedAction);
    }
  };


  const postActivityLogAddCredit = (e, props, userId, pathname) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "ProfileList",
      action: "Add Credit",
      target: e.target.id,
      dataTestId: e.target.dataset,
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    postNewActivityLogAction({ event: payload });
    props.history.push(pathname);
  };

  const postActivityLogEditProfile = (e, props, userId, pathname) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "ProfileList",
      action: "Edit Profile",
      target: e.target.id,
      dataTestId: e.target.dataset,
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    postNewActivityLogAction({ event: payload });
    props.history.push(pathname);
  };

  const postActivityLogCreateRollerCoster = (e, props, userId, pathname) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "NewCreditForm",
      action: "Create Roller Coaster",
      target: e.target.id,
      dataTestId: e.target.dataset,
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    postNewActivityLogAction({ event: payload });
    props.history.push(pathname);
  };

  const postActivityLogRegistration = (e, userId) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "Register",
      action: "New User Registration",
      target: e.target.id,
      dataTestId: e.target.dataset,
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    postNewActivityLogAction({ event: payload });
  };

  const postActivityLogDeleteEvent = (e, userId) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "Event.js",
      action: "Delete Calendar Event",
      target: e.target.id,
      dataTestId: e.target.dataset,
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    postNewActivityLogAction({ event: payload });
  }

  return (
    <ActivityLogContext.Provider
      value={{
        postNewActivityLogAction,
        getCurrentUserActivity,
        postActivityLogAddCredit,
        postActivityLogEditProfile,
        postActivityLogCreateRollerCoster,
        postActivityLogRegistration,
        postActivityLogDeleteEvent,
        activityLog,
        actions,
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
};
