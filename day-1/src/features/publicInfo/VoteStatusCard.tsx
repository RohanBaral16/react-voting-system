import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { HiXCircle } from "react-icons/hi";

export type StatusType = "successful" | "failed";
export interface RegistrationStatusProps {
  status: StatusType;
}

export default function VotingStatusCard({ status }: RegistrationStatusProps) {
  return (
    <div className="flex justify-center items-center bg-inherit h-full">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl 
            p-8 shadow-lg space-y-6 mt-4 text-primary dark:text-white "
      >
        {/* Title */}
        <p className="flex items-center gap-2 text-lg font-semibold">
          {status === "successful" ? (
            <SiTicktick className="text-emerald-400" />
          ) : (
            <HiXCircle className="text-red-500" />
          )}
          Voting {status}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-400 dark:text-slate-300">
          {status === "successful" &&
            "Your vote has been successfully recorded. Thank you for participating in the election."}
          {status === "failed" &&
            "We were unable to submit your vote. Your selection has not been recorded. Please retry or reach out to the election support team."}
        </p>

        {/* Navigation buttons */}
        <div className="flex gap-4 justify-between">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
