import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../../components/ui/FeatureCard";
import { MdHowToVote, MdOutlineBallot } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaChartPie, FaUserGear } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import VoterInfo from "./VoterInfo";
import type { IconType } from "react-icons";
import VotingStatus from "./VotingStatus";
import VoteDashboardCard from "./components/VoteDashboardCard";
import { checkVoteStatus } from "../../api/votingFetch";

interface DashboardItems {
  to: string;
  label: string;
  icon: IconType;
}

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const [hasVoted, setHasVoted] = useState<{ fptp: boolean; pr: boolean }>({
    fptp: true,
    pr: true,
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
    // getStatus();
  }, [user]);

  const cardLinkStyle =
    "block rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-105 transition-transform";

  const dashboardItems: DashboardItems[] = [
    {
      to: "vote",
      label: "Vote",
      icon: MdHowToVote,
    },
    {
      to: "/ballot-info",
      label: "E-Ballot Information",
      icon: MdOutlineBallot,
    },
    {
      to: "/candidates-info",
      label: "Candidates Information",
      icon: FaPeopleGroup,
    },
    {
      to: "/election-results",
      label: "Election Results",
      icon: FaChartPie,
    },
    {
      to: "/election-info",
      label: "Election Info",
      icon: FaInfoCircle,
    },
    {
      to: "voter-info",
      label: "Voter Information",
      icon: FaUserGear,
    },
  ];

  const dashboardItemsElements = dashboardItems.map((item, index) => {
    const Icon = item.icon;
    return (
      <Link
        className={cardLinkStyle}
        {...(index === 0 && { tabIndex: 0 })}
        to={item.to}
      >
        <FeatureCard>
          <Icon className="text-[50px] sm:text-[80px]" />
          <p className="text-sm font-bold sm:text-lg text-center mt-2 w-full text-wrap truncate">
            {item.label}
          </p>
        </FeatureCard>
      </Link>
    );
  });

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
      {/* <div className="flex flex-wrap
                w-full h-full p-5 pt-10 \
                gap-10 border border-red-600 
                justify-center items-start content-start
                bg-[#FFFFFA]">
            {dashboardItemsElements}
            </div> */}
    </main>
  );
}
