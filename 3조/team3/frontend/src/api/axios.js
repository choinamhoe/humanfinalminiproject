import axios from "axios";
import URL from "../constants/Url";

export const api = axios.create({
  baseURL: URL.SERVER_URL, // 백엔드 주소
  timeout: 5000, // 요청 제한 시간 5초
});
export const apiWithCredential = axios.create({
  baseURL: URL.SERVER_URL, // 백엔드 주소
  timeout: 5000, // 요청 제한 시간 5초
  withCredentials: true,
});

console.log(URL.PY_SERVER_URL);
export const py_api = axios.create({
  baseURL: URL.PY_SERVER_URL, // 백엔드 주소
  timeout: 15000, // 요청 제한 시간 15초
});
