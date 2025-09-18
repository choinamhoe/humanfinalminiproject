import { api } from "./axios";

export const findShops = async (data) => {
  try {
    const res = await api.post(`/ask`, data);
    return res.data;
  } catch (err) {
    console.error("api 요청 실패", err);
    throw err;
  }
};
