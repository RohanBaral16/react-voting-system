import api from "./apiSetup";

export interface PartyResult {
  party__id: number;
  party__name: string;
  total_votes: number;
}

export interface CandidateResult {
  candidate__id: number | null;
  candidate__name: string | null;
  electoral_area__name: string;
  total_votes: number;
}

export const getPRResult = async (): Promise<PartyResult[]> => {
  try {
    const res = await api.get("/results/parties");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch PR results",
    );
  }
};

export const getFPTPResult = async (): Promise<CandidateResult[]> => {
  try {
    const res = await api.get("/results/candidates");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch FPTP results",
    );
  }
};
