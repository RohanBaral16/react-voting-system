import type { CandidateResult } from "../../api/resultFetch";

interface CandidateResultCardProps {
  result: CandidateResult;
  rank: number;
  totalVotes: number;
}

export default function CandidateResultCard({
  result,
  totalVotes,
}: CandidateResultCardProps) {
  const percentage =
    totalVotes > 0 ? ((result.total_votes / totalVotes) * 100).toFixed(1) : 0;

  return (
    <div className="border-2 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {result.candidate__name || "NOTA"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {result.electoral_area__name}
          </p>
          {result.candidate__id && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              ID: {result.candidate__id}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {result.total_votes}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">votes</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Vote Share
          </span>
          <span className="text-xs font-bold text-gray-900 dark:text-white">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
