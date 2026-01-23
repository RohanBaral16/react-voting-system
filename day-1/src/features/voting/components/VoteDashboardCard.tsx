import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

export default function VoteDashboardCard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to={"/vote/fptp"}
          className="  group relative overflow-hidden bg-primary dark:bg-blue-950 rounded-2xl p-8 flex 
        flex-col justify-between h-[300px] shadow-lg shadow-primary/20 cursor-pointer hover:translate-y-[-4px] transition-all"
        >
          <div className="absolute top-0 right-0 p-4 opacity-50 dark:opacity-15 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined !text-[140px] leading-none text-white">
              how_to_vote
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-white text-2xl font-black leading-tight mb-2">
              Cast Your
              <br />
              Vote {`in ${user?.electoral_area?.name}`}
            </h3>
            <p className="text-white/80 text-sm font-medium max-w-[160px]">
              Cast your vote for your representative and Proportional
              Representation.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
            <span>Open Ballot</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </Link>

        {/* next card */}
      </div>
    </div>
  );
}
