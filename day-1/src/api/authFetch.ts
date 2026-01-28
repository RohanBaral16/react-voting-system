import api from "./apiSetup";
import type { RegistrationFormDataType } from "../features/auth/Register";

// ---------------------- LOGIN ---------------------- refactored to axios
export const login = async (email: string, password: string) => {
  try {
    console.log({ email: email, password: password });
    const res = await api.post("api/voter/login/", {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// ---------------------- GET PROFILE ---------------------- refactored to axios
export const getProfile = async () => {
  try {
    const res = await api.get("api/voter/profile/");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Not logged in");
  }
};

// ---------------------- LOGOUT ----------------------
export const logout = async () => {
  try {
    await api.get("api/voter/logout/");
    sessionStorage.clear();
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Logout failed");
  }
};

// ---------------------- REGISTER ----------------------
export const registerUser = async (userData: RegistrationFormDataType) => {
  const requestBody = {
    name: userData.name,
    email: userData.email,
    // dob: ,
    // voterId: ,
    // citizenshipNo: ,
    // fatherName: ,
    // phoneNo: ,
    password: userData.password,
    province_name: userData.province,
    district_name: userData.district,
    electoral_area_name: userData.constituency,
  };

  console.log("Request body", requestBody);
  try {
    const res = await api.post("api/voter/register/", requestBody);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};
