import { py_api } from "./axios";

export const imageUpload = async (file) => {
  console.log(file);
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await py_api.post("/predict", formData);
    return res;
  } catch (err) {
    console.log("image upload error", err);
    throw err;
  }
};
