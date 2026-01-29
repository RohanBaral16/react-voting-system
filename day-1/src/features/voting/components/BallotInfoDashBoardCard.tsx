import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

type VoteDashboardCardProps = {
  hasVotedfptp: boolean;
  hasVotedpr: boolean;
};

export default function BallotInfoDashBoardCard({
  hasVotedfptp,
  hasVotedpr,
}: VoteDashboardCardProps) {
  const { user } = useContext(AuthContext);
  const hasVotedBoth = hasVotedfptp && hasVotedpr;

  return (
    <div>
      <Link
        to="/ballot-info"
        className="group relative overflow-hidden bg-purple-600
         dark:bg-purple-900 shadow-purple-600/20 rounded-2xl
          p-8 flex flex-col justify-between h-75 w-75 shadow-lg
           cursor-pointer hover:translate-y-[-4px] transition-all"
      >
        <div className="absolute top-0 right-0 p-4 opacity-50 dark:opacity-15 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined !text-[140px] leading-none text-white">
            ballot
          </span>
        </div>
        <div className="relative z-10">
          <h3 className="text-white text-2xl font-black leading-tight mb-2">
            Ballot
            <br />
            Information
          </h3>
          <p className="text-white/80 text-sm font-medium max-w-[160px]">
            View detailed information about candidates, parties, and ballot
            structure for {user?.electoral_area}.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
          <span>View Details</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
      </Link>

      {/* next card */}
    </div>
  );
}
