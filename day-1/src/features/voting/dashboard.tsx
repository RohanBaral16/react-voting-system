import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import VoterInfo from "./VoterInfo";
import VotingStatus from "./VotingStatus";
import VoteDashboardCard from "./components/VoteDashboardCard";
import { checkVoteStatus } from "../../api/votingFetch";

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const [hasVoted, setHasVoted] = useState<{ fptp: boolean; pr: boolean }>({
    fptp: false,
    pr: false,
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, loading]);

  useEffect(() => {
    if (!user) return; // Guard here

    const getStatus = async () => {
      try {
        const data = await checkVoteStatus();
        setHasVoted({
          fptp: data?.has_voted_fptp || false,
          pr: data?.has_voted_pr || false,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getStatus();
  }, [user]);

  if (!user) {
    return null;
  }
  return (
    // population feature cards
    <main className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <VoterInfo />
      <VotingStatus hasVotedfptp={hasVoted.fptp} hasVotedpr={hasVoted.pr} />
      <div>
        <VoteDashboardCard
          hasVotedfptp={hasVoted.fptp}
          hasVotedpr={hasVoted.pr}
        />
      </div>
    </main>
  );
}
