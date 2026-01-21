import api from "./apiSetup";

// ---------------------- LOGIN ---------------------- refactored to axios
export const login = async (email: string, password: string) => {
  try {
    console.log({ email: email, password: password })
    const res = await api.post("api/voter/profile", { email: email, password: password });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// ---------------------- GET PROFILE ---------------------- refactored to axios
export const getProfile = async () => {
  try {
    const res = await api.get("api/voter/profile");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Not logged in");
  }
};

// ---------------------- LOGOUT ----------------------
export const logout = async () => {
  try {
    sessionStorage.clear();
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

// ---------------------- REGISTER ----------------------
export const registerUser = async (userData: {
  name: string;
  email: string;
  // dob: string;
  // voterId: string;
  // citizenshipNo: string;
  // fatherName: string;
  // phoneNo: string;
  password: string;
  province: string;
  district: string;
  constituency: string;
}) => {

  const requestBody = {
    name: userData.name,
    email: userData.email,
    // dob: ,
    // voterId: ,
    // citizenshipNo: ,
    // fatherName: ,
    // phoneNo: ,
    password: userData.password,
    province_id: userData.province,
    district_id: userData.district,
    electoral_area_id: userData.constituency,

  }

  console.log('Request body', requestBody)
  try {
    const res = await api.post("api/voter/register", requestBody);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Registration failed");
  }
};
