// const express = require("express");
// const cors = require("cors");
// const jwt = require("express-jwt");
// const jwksRsa = require("jwks-rsa");

// // Create a new Express app
// const app = express();

// // Accept cross-origin requests from the frontend app
// app.use(cors({ origin: 'http://localhost:3000' }));

// // Set up Auth0 configuration
// const authConfig = {
//   domain: "dev-405n1e6w.auth0.com",
//   audience: "https://api.quantumcoasters.com"
// };

// // Define middleware that validates incoming bearer tokens
// // using JWKS from dev-405n1e6w.auth0.com
// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${auth_config.domain}/.well-known/jwks.json`
//   }),

//   audience: authConfig.audience,
//   issuer: `https://${auth_config.domain}/`,
//   algorithm: ["RS256"]
// });

// // Define an endpoint that must be called with an access token
// app.get("/api/external", checkJwt, (req, res) => {
//   res.send({
//     msg: "Your Access Token was successfully validated!"
//   });
// });

// // Start the app
// app.listen(8000, () => console.log('API listening on 8000'));






// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3000;

// server.use(middlewares);
// server.use(router);

// server.listen(port);
/******************************  ******************************/
// var express = require("express");
// var app = express();
// var jwt = require("express-jwt");
// var jwks = require("jwks-rsa");

// var port = process.env.PORT || 8000;

// var jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "https://dev-405n1e6w.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "https://api.quantumcoasters.com",
//   issuer: "https://dev-405n1e6w.auth0.com/",
//   algorithms: ["RS256"],
// });

// app.use(jwtCheck);

// app.get("/authorized", function (req, res) {
//   res.send("Secured Resource");
// });

// app.listen(port);
