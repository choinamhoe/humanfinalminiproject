const cors = require("cors");
const config = require("../config");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: [`http://localhost:${config.FRONT_PORT}`, "http://192.168.0.51:3000"],
  credentials: true,
};

module.exports = {
  corsMiddleware: cors(corsOptions),
  cookieMiddleware: cookieParser(),
};
