import { Route, Redirect } from "react-router-dom";
import React, { Component, useState } from "react";
import ProfileList from "./profile/ProfileList";
import LoginLandingPage from "./auth/Login";
import Home from "./home/Home";

const ApplicationViews = props => {
  console.log("props", props);
  // const user = await props.user;
  const isAuthenticated = props.isAuthenticated;

  return (
    <React.Fragment>
      {/* <Route
        exact
        path="/home"
        render={props => {
          if (isAuthenticated === true) {
            return <Home {...props} />;
          } else {
            return <Redirect to="/" component={LoginLandingPage} />;
          }
        }}
      /> */}
      <Route
        exact
        path="/home"
        render={props => {
          return <Home {...props} />;
        }}
      />
      <Route
        exact
        path="/"
        render={props => {
          return <LoginLandingPage {...props} />;
        }}
      />
      <Route
        exact
        path="/profile"
        render={props => {
          return <ProfileList {...props} />;
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
