import ElectionSymbol from "../publicInfo/ElectionSymbol";
import { useState, useEffect } from "react";
import { getAllCandidates, getAllParties } from "../../api/votingFetch";
import VoterInfo from "./VoterInfo";
import { Link } from "react-router-dom";
export default function BallotInfo() {
  const [parties, setParties] = useState<
    {
      id: number;
      name: string;
      symbol: string;
    }[]
  >([]);
  const [candidates, setCandidates] = useState<
    {
      id: number;
      name: string;
      party: string;
      symbol: string;
    }[]
  >([]);

  const [searchString, setSearchString] = useState<string | null>(null);

  useEffect(() => {
    const getParties = async () => {
      try {
        const data = await getAllParties();
        const recievedCandidates = [...data.parties];
        const modifiedCandidates = recievedCandidates.map((c) => {
          return {
            id: c.id,
            name: c.name,
            symbol: c.symbol,
          };
        });
        setParties(modifiedCandidates);
      } catch (err) {
        console.log(err || "Couldn't fet candidates");
      }
    };
    getParties();
    console.log("parties", parties);
  }, []);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const data = await getAllCandidates();
        const recievedCandidates = [...data.candidates];
        const modifiedCandidates = recievedCandidates.map((c) => {
          const party = parties.find((p) => p.name === c.party__name);
          return {
            id: c.id,
            name: c.name,
            party: c.party__name || "default",
            symbol: party?.symbol || "default",
          };
        });
        setCandidates(modifiedCandidates);
      } catch (err) {
        console.log(err || "Couldn't fet candidates");
      }
    };
    getCandidates();
    console.log("candidates", candidates);
  }, [parties]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setSearchString(inputText);
  };

  const searchBar = (
    <div className="md:col-span-2">
      <label className="relative flex items-center w-full">
        <span className="absolute left-4 text-[#4c6c9a] material-symbols-outlined">
          search
        </span>
        <input
          value={searchString ? searchString : ""}
          onChange={handleSearchChange}
          className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-white dark:bg-slate-800 shadow-sm focus:ring-2 focus:ring-primary text-base placeholder:text-[#4c6c9a]"
          placeholder="Search by name or party..."
        />
        <button
          onClick={() => {
            setSearchString(null);
          }}
          className="absolute right-4  flex gap-2 bg-inhe justify-center items-center
           text-[#4c6c9a] hover:text-[#4c6c9a]/70  bg-white dark:bg-slate-800 rounded-md"
        >
          <span className="material-symbols-outlined">close</span>
          <p>Clear</p>
        </button>
      </label>
    </div>
  );

  const dynamicCandidateGrid = candidates.map((cand) => {
    if (searchString) {
      const searchLower =
        typeof searchString === "string" ? searchString.toLowerCase() : "";
      if (
        !cand.name.toLowerCase().includes(searchLower) &&
        !cand.party.toLowerCase().includes(searchLower)
      ) {
        // Candidate doesn't match the search
        return null; // or skip rendering this card
      }
    }

    return (
      <div key={cand.id} className="hidden md:block">
        {/* Desktop view: Large card */}
        <div
          className={`bg-white dark:bg-slate-800 
     rounded-2xl overflow-hidden shadow-2xl  
       hover:scale-102
     w-60 h-80 cursor-pointer
     transition-all flex flex-col 
     hover:border hover:border-primary/60`}
        >
          <div className="relative h-40 bg-slate-200 dark:bg-slate-700">
            <div
              className="absolute inset-0 bg-cover bg-center flex justify-center items-center"
              data-alt={`Portrait of candidate ${cand.name}`}
            >
              <span className="material-symbols-outlined text-5xl!">
                account_circle
              </span>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-lg shadow-md backdrop-blur-sm ">
              <div
                className="size-12 text-4xl flex justify-center items-center overflow-hidden"
                data-alt={`${cand.symbol} symbol of ${cand.party}`}
              >
                <ElectionSymbol symbol={cand.symbol} />
              </div>
            </div>
          </div>
          <div className="p-3 h flex-1 flex flex-col justify-between   ">
            <div className={`pl-3 mb-4 grow flex-1 border-l-4 border-primary`}>
              <h3 className="text-xl font-black mb-1">{cand.name}</h3>
              <p className="text-primary font-bold text-sm tracking-wide uppercase">
                {cand.party}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const dynamicMobileCandidateList = candidates.map((cand) => {
    if (searchString) {
      const searchLower =
        typeof searchString === "string" ? searchString.toLowerCase() : "";
      if (
        !cand.name.toLowerCase().includes(searchLower) &&
        !cand.party.toLowerCase().includes(searchLower)
      ) {
        return null;
      }
    }

    return (
      <div key={cand.id} className="md:hidden">
        {/* Mobile view: Compact row */}
        <div
          className={`bg-white dark:bg-slate-800 rounded-3xl h-25 full overflow-hidden  flex items-center px-3 
           gap-3  mb-3 cursor-pointer transition-all border border-slate-200 dark:border-slate-700
           }`}
        >
          {/* Account circle icon */}
          <span className="material-symbols-outlined text-4xl! flex-shrink-0">
            account_circle
          </span>

          {/* Name and Party info */}
          <div className={`w-50 border-l-4 "border-primary  pl-4`}>
            <h3 className="text-sm font-black truncate">{cand.name}</h3>
            <p className="text-xs font-bold text-primary uppercase truncate">
              {cand.party}
            </p>
          </div>

          {/* Party symbol emoji */}
          <div className="flex-shrink-0 text-lg">
            <ElectionSymbol symbol={cand.symbol} />
          </div>
        </div>
      </div>
    );
  });

  const candidateGrid = (
    <div>
      {/* Desktop grid */}
      <div
        className="hidden md:flex flex-wrap justify-center items-center
       content-center gap-10 py-6 w-full"
      >
        {dynamicCandidateGrid}
      </div>
      {/* Mobile list */}
      <div className="md:hidden px-4 py-6">{dynamicMobileCandidateList}</div>
    </div>
  );

  const dynamicPartyGrid = parties.map((party) => {
    if (searchString) {
      const searchLower =
        typeof searchString === "string" ? searchString.toLowerCase() : "";
      if (!party.name.toLowerCase().includes(searchLower)) {
        return null;
      }
    }

    return (
      <div key={party.id} className="hidden md:block">
        {/* Desktop view: Large card */}
        <div
          className={`bg-white dark:bg-slate-800 
        rounded-2xl overflow-hidden shadow-2xl  
        hover:scale-102
        w-60 h-80 cursor-pointer
        transition-all flex flex-col hover:border hover:border-primary/60`}
        >
          {/* Party Symbol / Emoji */}
          <div className="relative h-40 bg-slate-200 dark:bg-slate-700 flex justify-center items-center">
            <div className="text-5xl">
              <ElectionSymbol symbol={party.symbol} />
              {/* OR emoji directly: {party.emoji} */}
            </div>
          </div>

          <div className="p-3 flex-1 flex flex-col justify-between">
            <div
              className={`pl-3 mb-4 grow flex-1 border-l-4 "border-primary}`}
            >
              <h3 className="text-xl font-black mb-1">{party.name}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const dynamicPartyMobileList = parties.map((party) => {
    if (searchString) {
      const searchLower =
        typeof searchString === "string" ? searchString.toLowerCase() : "";
      if (!party.name.toLowerCase().includes(searchLower)) {
        return null;
      }
    }

    return (
      <div key={party.id} className="md:hidden">
        {/* Mobile view: Compact row */}
        <div
          className={`bg-white dark:bg-slate-800 rounded-3xl h-25 full overflow-hidden  flex items-center px-3 
           gap-3  mb-3 cursor-pointer transition-all border border-slate-200 dark:border-slate-700`}
        >
          {/* Party symbol emoji */}
          <div className="flex-shrink-0 text-4xl">
            <ElectionSymbol symbol={party.symbol} />
          </div>

          {/* Party name info */}
          <div className={`w-50 border-l-4 "border-primary pl-4`}>
            <h3 className="text-sm font-black truncate">{party.name}</h3>
            <p className="text-xs font-bold text-primary uppercase truncate">
              Proportional Representation
            </p>
          </div>
        </div>
      </div>
    );
  });

  const partyGrid = (
    <div>
      {/* Desktop grid */}
      <div className="hidden md:flex flex-wrap justify-center items-center content-center gap-10 py-6 w-full">
        {dynamicPartyGrid}
      </div>
      {/* Mobile list */}
      <div className="md:hidden px-4 py-6">{dynamicPartyMobileList}</div>
    </div>
  );

  return (
    <main className="bg-background-light/50 dark:bg-background-dark/50 flex-1">
      <div
        className="flex flex-col p-6 w-full max-w-7xl space-y-6 
    mx-auto 
        "
      >
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 w-fit px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg shadow-md border border-gray-200 dark:border-slate-700 transition-all hover:shadow-lg"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <span>Go Back to Dashboard</span>
        </Link>
        <VoterInfo />
        {searchBar}
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="font-bold border-l-4 border-blue-500 w-full px-5 text-xl sm:text-2xl">
            Your FPTP Candidate Ballot :
          </h2>
          {candidateGrid}
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="font-bold border-l-4 border-blue-500 w-full px-5 text-xl sm:text-2xl">
            Your PR Ballot :
          </h2>
          {partyGrid}
        </div>
      </div>
    </main>
  );
}
