import React, { useState, useContext } from "react";
import { postErrorLog, getUserErrorLog, retrieveErrorLog } from "../modules/services/services";

export const ErrorLogContext = React.createContext();
export const useErrorLog = () => useContext(ErrorLogContext);

export const ErrorLogProvider = ({ children }) => {
  const [errorLog, setErrorlog] = useState([]);
  //   const [error, setError] = useState([]);

  const postNewErrorLog = async (error, component, callingFunction) => {
    let date = new Date();
    date = date.toUTCString();
    const payload = {
      message: error.message,
      stack: error.stack,
      component: component,
      callingFunction: callingFunction,
      time: date,
      sessionId: sessionStorage.getItem("sessionId"),
    };
    console.log({payload})

    const newErrorLog = await postErrorLog(payload);
    console.log({newErrorLog});
    // setErrorlog(newErrorLog);
  };

  const getCurrentUserErrorLogs = async (userId) => {
    const currentUserErrorLogs = await getUserErrorLog(userId);
    setErrorlog(currentUserErrorLogs);
  };

  const fetchOneErrorLog = async (errorLogId) => {
    const response = await retrieveErrorLog(errorLogId);
    setErrorlog(response);
  };

  return (
    <ErrorLogContext.Provider
      value={{
        postNewErrorLog,
        getCurrentUserErrorLogs,
        fetchOneErrorLog,
        errorLog,
      }}
    >
      {children}
    </ErrorLogContext.Provider>
  );
};
