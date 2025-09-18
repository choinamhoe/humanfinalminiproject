import { apiWithCredential } from "./axios";

export const postWrite = async (userUid, password) => {
  try {
    const res = await apiWithCredential.get("/posts", {
      userUid,
      password,
    });
    return res.data;
  } catch (err) {
    console.log("error", err);
    throw err;
  }
};
