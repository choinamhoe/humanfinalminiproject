const SERVER_URL =
  process.env.NODE_ENV === "production" ? "/node" : "http://localhost:5000";
const PY_SERVER_URL =
  process.env.NODE_ENV === "production" ? "/py" : "http://localhost:5001";

const URL = {
  HOME: "/",
  INTRODUCE: "/introduce",
  NEWS: "/news",
  Q_A: "/q&a",
  Q_A_WRITE: "/q&a/write",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SERVER_URL,
  PY_SERVER_URL,
  TEST_PATH: "/test",
};
export default URL;
