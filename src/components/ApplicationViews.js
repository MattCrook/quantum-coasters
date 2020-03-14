// import { Route, Redirect } from "react-router-dom";
// import React, { Component, useState } from "react";

// const ApplicationViews = props => {
//   const hasUser = props.hasUser;
//   const setUser = props.setUser;
// };




const GetData = async () => {
  const response = await fetch(
    `https://api.nasa.gov/techtransfer?api_key=oVbjj1iEMr2fXGT6jgNQugBlL69tPWDaRsZaDbPl`
  )
    .then(response => response.json())
    .then(data => console.log(data));
  return response;
};




export default GetData
