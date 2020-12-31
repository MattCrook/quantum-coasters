import React, { useState, useContext } from "react";
import { postActivityLog, getUserActivityLog, postLoginInfo, postErrorLog } from "../modules/services/services";

export const ActivityLogContext = React.createContext();
export const useActivityLog = () => useContext(ActivityLogContext);

export const ActivityLogProvider = ({ children }) => {
  const [activityLog, setActivityLog] = useState([]);
  const [actions, setActions] = useState([]);
  const [loginData, setLoginData] = useState([]);

  const postNewActivityLogAction = async (payload) => {
    await postActivityLog(payload);
    // setActivityLog(postAction);
  };

  const getCurrentUserActivity = async (userId) => {
    const currentUserActivity = await getUserActivityLog(userId);
    setActivityLog(currentUserActivity);

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

  const postActivityLogAddCredit = async (e, props, userId, pathname) => {
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

    await postNewActivityLogAction({ event: payload });
    props.history.push(pathname);
  };

  const postActivityLogEditProfile = async (e, props, userId, pathname) => {
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

    await postNewActivityLogAction({ event: payload });
    props.history.push(pathname);
  };

  const postActivityLogCreateRollerCoster = async (e, props, userId, pathname) => {
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

    await postNewActivityLogAction({ event: payload });
    props.history.push(pathname);
  };

  const postActivityLogRegistration = async (props, userId, pathname) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "Register",
      action: "New User Registration - Create profile",
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    await postNewActivityLogAction({ event: payload });
    props.history.push(pathname);
  };

  const postActivityLogDeleteEvent = async (e, userId) => {
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

    await postNewActivityLogAction({ event: payload });
  };

  const postActivityLogStartNewsApplication = async (e, userId, props) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "News.js",
      action: "Start Blog Contributor Application",
      target: e.target.id,
      dataTestId: e.target.dataset,
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    await postNewActivityLogAction({ event: payload });
    props.history.push("/news/contributor/apply");
  };

  const postActivityLogSubmitNewsApplication = async (e, userId) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "News.js",
      action: "Start Blog Contributor Application",
      target: e.target.id,
      dataTestId: e.target.dataset,
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    await postNewActivityLogAction({ event: payload });
  };

  const postNewParkActivityLog = async (e, userId) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "News.js",
      action: "Start Blog Contributor Application",
      target: e.target.id,
      dataTestId: e.target.dataset,
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    await postNewActivityLogAction({ event: payload });
  };

  const postEditProfileActivityLog = async (userId, props, pathname) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "EditProfile.js",
      action: "Update and or Edit user profile and auth user.",
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    await postNewActivityLogAction({ event: payload });
    props.history.push(pathname)
  }

  const postChangeProfilePictureActivityLog = async (userId) => {
    let currentDate = new Date();
    let dateTime = currentDate.toISOString();
    let date = dateTime.split("T")[0];

    const action = {
      component: "EditProfile.js",
      action: "Update or upload new profile picture.",
    };

    const payload = {
      user_id: userId,
      action: action,
      date: date,
    };

    await postNewActivityLogAction({ event: payload });
  }

  const sendLoginInfo = async (data) => {
    try {
      const response = await postLoginInfo(data);
      setLoginData(response);
    } catch (err) {
      console.log({ "Error sending Login Info": err });
      await postErrorLog(err, 'Register.js from ActivityLogContext', 'sendLoginInfo')
    }
  };

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
        postActivityLogStartNewsApplication,
        postActivityLogSubmitNewsApplication,
        postNewParkActivityLog,
        postEditProfileActivityLog,
        postChangeProfilePictureActivityLog,
        activityLog,
        actions,
        sendLoginInfo,
        loginData,
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
};
