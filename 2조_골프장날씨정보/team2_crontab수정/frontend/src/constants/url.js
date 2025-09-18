const SERVER_URL =
  process.env.NODE_ENV === "production" ? "/node" : "http://192.168.0.38:8000";

const URL = {
  HOME: "/",
  SERVER_URL,
  TEST_PATH: "/test",
};
export default URL;
