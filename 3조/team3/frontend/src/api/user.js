import { api, apiWithCredential } from "./axios";

export const loginApi = async (userUid, password) => {
  try {
    const res = await apiWithCredential.post("/users/login", {
      userUid,
      password,
    });
    return res.data;
  } catch (err) {
    console.log("error", err);
    throw err;
  }
};

export const SignupApi = async (userUid, password, name, mobile) => {
  try {
    const res = await api.post("/users/signup", {
      userUid,
      password,
      name,
      mobile,
    });
    return res;
  } catch (err) {
    console.log("error", err);
    throw err;
  }
};

export const logoutApi = async () => {
  try {
    const res = await apiWithCredential.post("/users/logout");
    return res.data;
  } catch (err) {
    throw err;
  }
};
