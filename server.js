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
