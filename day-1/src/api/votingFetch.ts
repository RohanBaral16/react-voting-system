import api from "./apiSetup";

type Candidate =
  | {
      id: number;
      name: string;
      party: string;
      symbol: string;
    }
  | undefined;

type Party =
  | {
      id: number;
      name: string;
      symbol: string;
    }
  | undefined;

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

export const getAllCandidates = async () => {
  try {
    const res = await api.get("api/candidates/");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Voting status fetch failed",
    );
  }
};

export const getAllParties = async () => {
  try {
    const res = await api.get("api/parties/");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Voting status fetch failed",
    );
  }
};

export const submitVotes = async ({
  selectedCandidate,
  selectedParty,
}: {
  selectedCandidate: Candidate;
  selectedParty: Party;
}) => {
  if (!selectedCandidate || !selectedParty) {
    return;
  }
  try {
    // 1️⃣ Submit FPTP vote
    const fptpData = new FormData();
    fptpData.append("vote_type", "FPTP");
    fptpData.append("candidate_id", String(selectedCandidate.id));
    for (let [key, value] of fptpData.entries()) {
      console.log(key, value);
    }
    const fptpRes = await api.post("vote/submit/", fptpData);

    // 2️⃣ Submit PR vote
    const prData = new FormData();
    prData.append("vote_type", "PR");
    prData.append("party_id", String(selectedParty?.id || ""));

    const prRes = await api.post("vote/submit/", prData);

    return {
      fptp: fptpRes.data,
      pr: prRes.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Vote submission failed");
  }
};

export const getCandidateResult = async () => {
  try {
    const res = await api.get("api/candidates/");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Voting status fetch failed",
    );
  }
};
