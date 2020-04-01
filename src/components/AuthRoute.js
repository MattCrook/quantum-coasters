// import React  from "react";
// import { Route } from "react-router-dom";
// import { useAuth0 } from "../contexts/react-auth0-context";
// import LoginLandingPage from "./auth/Login";


// // a higher order component that wraps a standard <Route> and adds authentication mechanism to it.

// const AuthRoute = ({ path, Destination, ...superProps }) => {
//   const { isAuthenticated } = useAuth0();
//   return (
//     <Route
//       exact
//       path={path}
//       render={props => {
//         if (isAuthenticated) {
//           return <Destination {...props} {...superProps} />;
//         } else {
//           return <LoginLandingPage />;
//         }
//       }}
//     />
//   );
// };
// export default AuthRoute;
