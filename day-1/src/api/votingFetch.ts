import api from "./apiSetup";

// ---------------------- LOGIN ---------------------- refactored to axios

// ---------------------- GET PROFILE ---------------------- refactored to axios
export const checkVoteStatus = async () => {
  try {
    const res = await api.get("api/voter/status/");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Voting status fetch failed",
    );
  }
};

// ---------------------- LOGOUT ----------------------
