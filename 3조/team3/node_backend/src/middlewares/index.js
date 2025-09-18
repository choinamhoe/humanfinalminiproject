const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const config = require("../config");

const corsOptions = {
  origin: [`http://localhost:${config.FRONT_PORT}`, "http://192.168.0.51:3000"],
  credentials: true,
};
const sessionMiddleware = session(config.SESSION);

module.exports = {
  jsonMiddleware: require("express").json(),
  corsMiddleware: cors(corsOptions),
  cookieMiddleware: cookieParser(),
  sessionMiddleware,
};
