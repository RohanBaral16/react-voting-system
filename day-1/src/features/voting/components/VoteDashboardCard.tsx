import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

type VoteDashboardCardProps = {
  hasVotedfptp: boolean;
  hasVotedpr: boolean;
};

export default function VoteDashboardCard({
  hasVotedfptp,
  hasVotedpr,
}: VoteDashboardCardProps) {
  const { user } = useContext(AuthContext);
  const hasVotedBoth = hasVotedfptp && hasVotedpr;

  return (
    <div>
      <Link
        to={hasVotedBoth ? "#" : "/vote/"}
        className={`group relative overflow-hidden ${
          hasVotedBoth
            ? "bg-green-600 dark:bg-green-900 shadow-green-600/20"
            : "bg-primary dark:bg-blue-950 shadow-primary/20"
        } rounded-2xl p-8 flex flex-col justify-between h-75 w-75 shadow-lg ${
          hasVotedBoth
            ? "cursor-default"
            : "cursor-pointer hover:translate-y-[-4px]"
        } transition-all`}
      >
        <div className="absolute top-0 right-0 p-4 opacity-50 dark:opacity-15 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined !text-[140px] leading-none text-white">
            {hasVotedBoth ? "check_circle" : "how_to_vote"}
          </span>
        </div>
        <div className="relative z-10">
          <h3 className="text-white text-2xl font-black leading-tight mb-2">
            {hasVotedBoth ? (
              <>
                Thank You!
                <br />
                {user?.username}
              </>
            ) : (
              <>
                Cast Your
                <br />
                Vote {`in ${user?.electoral_area}`}
              </>
            )}
          </h3>
          <p className="text-white/80 text-sm font-medium max-w-[160px]">
            {hasVotedBoth
              ? "Your votes have been successfully recorded. Thank you for participating in democracy!"
              : "Cast your vote for your representative and Proportional Representation."}
          </p>
        </div>
        {!hasVotedBoth && (
          <div className="relative z-10 flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
            <span>Open Ballot</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        )}
      </Link>

      {/* next card */}
    </div>
  );
}
