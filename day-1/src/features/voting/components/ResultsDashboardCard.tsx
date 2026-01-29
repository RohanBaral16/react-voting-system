import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFPTPResult,
  getPRResult,
  type CandidateResult,
  type PartyResult,
} from "../../../api/resultFetch";

type ResultsDashboardCardProps = {
  hasVotedfptp: boolean;
  hasVotedpr: boolean;
};

export default function ResultsDashboardCard({
  hasVotedfptp,
  hasVotedpr,
}: ResultsDashboardCardProps) {
  const [partyResults, setPartyResults] = useState<PartyResult[]>([]);
  const [candidateResults, setCandidateResults] = useState<CandidateResult[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const [prData, fptpData] = await Promise.all([
          getPRResult(),
          getFPTPResult(),
        ]);
        setPartyResults(prData);
        setCandidateResults(fptpData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const topParty = useMemo(() => {
    if (!partyResults.length) return null;
    return [...partyResults].sort((a, b) => b.total_votes - a.total_votes)[0];
  }, [partyResults]);

  const topCandidate = useMemo(() => {
    const validCandidates = candidateResults.filter(
      (c) => c.candidate__id !== null,
    );
    if (!validCandidates.length) return null;
    return [...validCandidates].sort(
      (a, b) => b.total_votes - a.total_votes,
    )[0];
  }, [candidateResults]);

  const totalVotes = useMemo(() => {
    const prTotal = partyResults.reduce((sum, r) => sum + r.total_votes, 0);
    const fptpTotal = candidateResults.reduce(
      (sum, r) => sum + r.total_votes,
      0,
    );
    return prTotal + fptpTotal;
  }, [partyResults, candidateResults]);

  return (
    <div>
      <Link
        to="/results"
        className="group relative overflow-hidden bg-blue-600
         dark:bg-blue-900 shadow-blue-600/20 rounded-2xl
          p-8 flex flex-col justify-between h-75 w-75 shadow-lg
           cursor-pointer hover:translate-y-[-4px] transition-all"
      >
        <div className="absolute top-0 right-0 p-4 opacity-50 dark:opacity-15 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined !text-[140px] leading-none text-white">
            monitoring
          </span>
        </div>

        <div className="relative z-10">
          <h3 className="text-white text-2xl font-black leading-tight mb-2">
            Results
            <br />
            Summary
          </h3>
          {loading ? (
            <p className="text-white/80 text-sm font-medium max-w-[160px]">
              Loading latest results...
            </p>
          ) : (
            <div className="space-y-2 text-white/90 text-sm font-medium">
              <p>Top Party: {topParty?.party__name || "Not available"}</p>
              <p>
                Top Candidate:{" "}
                {topCandidate?.candidate__name || "Not available"}
              </p>
              <p>Total Votes: {totalVotes}</p>
              {hasVotedfptp && hasVotedpr && (
                <p className="text-white/80 text-xs">Your vote is counted</p>
              )}
            </div>
          )}
        </div>
        <div className="relative z-10 flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
          <span>View Results</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
      </Link>
    </div>
  );
}
