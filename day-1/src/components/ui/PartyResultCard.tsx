import type { PartyResult } from "../../api/resultFetch";

interface PartyResultCardProps {
  result: PartyResult;
  rank: number;
  totalVotes: number;
}

export default function PartyResultCard({
  result,
  rank,
  totalVotes,
}: PartyResultCardProps) {
  const percentage =
    totalVotes > 0 ? ((result.total_votes / totalVotes) * 100).toFixed(1) : 0;

  const getRankColor = (rank: number) => {
    if (rank === 1)
      return "bg-yellow-100 border-yellow-400 dark:bg-yellow-900/20";
    if (rank === 2) return "bg-gray-100 border-gray-400 dark:bg-gray-800/20";
    if (rank === 3)
      return "bg-orange-100 border-orange-400 dark:bg-orange-900/20";
    return "bg-white dark:bg-gray-800";
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 shadow-md ${getRankColor(rank)} transition-transform hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">
            #{rank}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {result.party__name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Party ID: {result.party__id}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {result.total_votes}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">votes</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Vote Share
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
