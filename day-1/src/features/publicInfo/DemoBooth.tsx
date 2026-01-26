import VotingProcessStatusCard from "../voting/components/VotingProcessStatusCard";
import ElectionSymbol from "./ElectionSymbol";
import { useState, useEffect } from "react";
import VotingStatusCard from "./VoteStatusCard";

type VotingStates = "fptp" | "pr" | "review" | "successful" | "failed";

export default function DemoBooth() {
  const [selectedCandidateId, setselectedCandidateId] = useState<number | null>(
    null,
  );

  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null);

  const [searchString, setSearchString] = useState<string | null>(null);

  const [currentVotingState, setCurrentVotingState] =
    useState<VotingStates>("fptp");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentVotingState]);

  const candidates = [
    { id: 1, name: "Alice", symbol: "tree", party: "Nepali Congress" },
    { id: 2, name: "Bob", symbol: "bell", party: "Rastriya Prajatantra Party" },
    { id: 3, name: "Charlie", symbol: "sun", party: "CPN-UML" },
    { id: 4, name: "Diana", symbol: "shoes", party: "CPN (Maoist Center)" },
    { id: 5, name: "Ethan", symbol: "plough", party: "Janata Samajwadi Party" },
    {
      id: 6,
      name: "Fiona",
      symbol: "hammer",
      party: "Loktantrik Samajwadi Party",
    },
    {
      id: 7,
      name: "George",
      symbol: "sickle",
      party: "Terai Madhesh Loktantrik Party",
    },
    { id: 8, name: "Hannah", symbol: "book", party: "Rashtriya Janamorcha" },
    { id: 9, name: "Ian", symbol: "hand", party: "Nepal Workers Party" },
    { id: 10, name: "Julia", symbol: "kite", party: "CPN (Unified Socialist)" },
    {
      id: 11,
      name: "Kevin",
      symbol: "pen",
      party: "Rastriya Janata Party Nepal",
    },
    {
      id: 12,
      name: "Laura",
      symbol: "star",
      party: "Nepal Majdoor Kisan Party",
    },
    { id: 13, name: "Mike", symbol: "leaf", party: "Federal Socialist Forum" },
    {
      id: 14,
      name: "Nina",
      symbol: "crown",
      party: "Nepal Prajatantrik Party",
    },
    {
      id: 15,
      name: "Oscar",
      symbol: "flag",
      party: "Rastriya Prajatantra Party (Democratic)",
    },
    { id: 16, name: "Paula", symbol: "heart", party: "Nepal Shivsena" },
    {
      id: 17,
      name: "Quinn",
      symbol: "wheel",
      party: "Rastriya Janamorcha (Democratic)",
    },
    { id: 18, name: "Rachel", symbol: "cup", party: "Nepal Socialist Party" },
    {
      id: 19,
      name: "Steve",
      symbol: "moon",
      party: "Rastriya Prajatantra Party (Khadka)",
    },
    { id: 20, name: "Tina", symbol: "fish", party: "Nepal Democratic Party" },
  ];

  const parties = [
    { id: 1, name: "Nepali Congress", symbol: "tree" },
    { id: 2, name: "Rastriya Prajatantra Party", symbol: "bell" },
    { id: 3, name: "CPN-UML", symbol: "sun" },
    { id: 4, name: "CPN (Maoist Center)", symbol: "shoes" },
    { id: 5, name: "Janata Samajwadi Party", symbol: "plough" },
    { id: 6, name: "Loktantrik Samajwadi Party", symbol: "hammer" },
    { id: 7, name: "Terai Madhesh Loktantrik Party", symbol: "sickle" },
    { id: 8, name: "Rashtriya Janamorcha", symbol: "book" },
    { id: 9, name: "Nepal Workers Party", symbol: "hand" },
    { id: 10, name: "CPN (Unified Socialist)", symbol: "kite" },
    { id: 11, name: "Rastriya Janata Party Nepal", symbol: "pen" },
    { id: 12, name: "Nepal Majdoor Kisan Party", symbol: "star" },
    { id: 13, name: "Federal Socialist Forum", symbol: "leaf" },
    { id: 14, name: "Nepal Prajatantrik Party", symbol: "crown" },
    { id: 15, name: "Rastriya Prajatantra Party (Democratic)", symbol: "flag" },
    { id: 16, name: "Nepal Shivsena", symbol: "heart" },
    { id: 17, name: "Rastriya Janamorcha (Democratic)", symbol: "wheel" },
    { id: 18, name: "Nepal Socialist Party", symbol: "cup" },
    { id: 19, name: "Rastriya Prajatantra Party (Khadka)", symbol: "moon" },
    { id: 20, name: "Nepal Democratic Party", symbol: "fish" },
  ];

  // Pre-calculate to avoid multiple .find() calls in the JSX
  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId,
  );
  const selectedParty = parties.find((p) => p.id === selectedPartyId);

  const pageHeadingFPTP = (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          First-past-the-post Voting (FPTP)
        </h1>
        <p className="text-[#4c6c9a] dark:text-[#8ba7cf] text-lg font-medium">
          House of Representatives: Demo Constituency No. 1
        </p>
      </div>
    </div>
  );

  const pageHeadingPR = (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          Party Selection - Proportional Representation (PR)
        </h1>
        <p className="text-[#4c6c9a] dark:text-[#8ba7cf] text-lg font-medium">
          House of Representatives
        </p>
      </div>
    </div>
  );

  const instructionsAndSecurityBadgeFPTP = (
    <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-5 rounded-r-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-2xl mt-0.5">
          info
        </span>
        <p className="text-base font-medium leading-relaxed max-w-2xl">
          Please select exactly<span> </span>
          <span className="font-bold underline">one candidate</span> for the
          House of Representatives by clicking the 'Select to Vote' button. Your
          selection is private and encrypted.
        </p>
      </div>
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
        <span className="material-symbols-outlined">verified_user</span>
        <span className="text-xs uppercase tracking-wider">
          End-to-End Encrypted
        </span>
      </div>
    </div>
  );

  const instructionsAndSecurityBadgePR = (
    <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-5 rounded-r-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-2xl mt-0.5">
          info
        </span>
        <p className="text-base font-medium leading-relaxed max-w-2xl">
          Please select exactly<span> </span>
          <span className="font-bold underline">one party</span> for the
          Proportional Representation by clicking the 'Select to Vote' button.
          Your selection is private and encrypted.
        </p>
      </div>
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
        <span className="material-symbols-outlined">verified_user</span>
        <span className="text-xs uppercase tracking-wider">
          End-to-End Encrypted
        </span>
      </div>
    </div>
  );

  const handleCandidateSelect = (id: number) => {
    if (selectedCandidateId === id) {
      setselectedCandidateId(null);
    } else {
      setselectedCandidateId(id);
    }
  };

  const handlePartySelect = (id: number) => {
    if (selectedPartyId === id) {
      setSelectedPartyId(null);
    } else {
      setSelectedPartyId(id);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setSearchString(inputText);
  };

  const handleNext = () => {
    if (currentVotingState === "fptp") {
      setCurrentVotingState("pr");
    } else if (currentVotingState === "pr") {
      setCurrentVotingState("review");
    } else {
      setCurrentVotingState("fptp");
    }
  };

  const submitVote = () => {
    console.log(selectedCandidate);
    console.log(selectedParty);
    setCurrentVotingState("successful");
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

  const dynamicDemoCandidateGrid = candidates.map((cand) => {
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
      <div
        key={cand.id}
        role="button"
        onClick={() => handleCandidateSelect(cand.id)}
        className={`bg-white dark:bg-slate-800 
     rounded-2xl overflow-hidden shadow-2xl  
       hover:scale-102
     w-60 h-80 cursor-pointer
     transition-all flex flex-col ${selectedCandidateId === cand.id ? "border border-green-600 hover:border-green-600/70" : "hover:border hover:border-primary/60"}`}
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
          <div
            className={`pl-3 mb-4 grow flex-1 border-l-4 ${selectedCandidateId === cand.id ? "border-green-600" : "border-primary"}`}
          >
            <h3 className="text-xl font-black mb-1">{cand.name}</h3>
            <p className="text-primary font-bold text-sm tracking-wide uppercase">
              {cand.party}
            </p>
          </div>
          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 ">
            <button
              onClick={() => handleCandidateSelect(cand.id)}
              className={`w-full py-4 rounded-xl 
              ${selectedCandidateId === cand.id ? "bg-green-600 hover:bg-green-600/80" : "bg-primary hover:bg-primary/80"}
           text-white font-black text-lg active:scale-[0.98] transition-all 
           shadow-md flex items-center justify-center gap-2 cursor-pointer`}
            >
              {selectedCandidateId === cand.id ? "Selected" : "Select to Vote"}
              <span className="material-symbols-outlined">check_circle</span>
            </button>
          </div>
        </div>
      </div>
    );
  });

  const candidateGrid = (
    <div className="flex flex-wrap justify-center  items-center content-center gap-10 py-6 w-full ">
      {dynamicDemoCandidateGrid}
    </div>
  );

  const floatingNavigatorFPTP =
    selectedCandidateId !== null &&
    (() => {
      const cand = candidates.find((c) => c.id === selectedCandidateId);

      if (!cand) return null;

      return (
        <div
          className="fixed bottom-8 right-8 w-80 bg-white
         dark:bg-slate-800 rounded-2xl shadow-2xl 
         border border-transparent p-6 flex flex-col gap-4 animate-slide-up"
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl">
              <ElectionSymbol symbol={cand.symbol} />
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {cand.name}
              </div>
              <p className="text-sm text-primary font-bold tracking-wide uppercase">
                {cand.party}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            You have selected this candidate. You can now proceed to the next
            step.
          </p>
          <button
            className="w-full py-3 rounded-xl bg-primary text-white font-black text-lg
             hover:bg-primary/90 hover:scale-102 active:scale-[0.98] transition-all 
             shadow-md flex items-center justify-center gap-2"
            onClick={handleNext}
          >
            Proceed to PR ballot
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      );
    })();

  const dynamicDemoPartyGrid = parties.map((party) => {
    if (searchString) {
      const searchLower =
        typeof searchString === "string" ? searchString.toLowerCase() : "";
      if (!party.name.toLowerCase().includes(searchLower)) {
        return null;
      }
    }

    return (
      <div
        key={party.id}
        role="button"
        onClick={() => handlePartySelect(party.id)}
        className={`bg-white dark:bg-slate-800 
        rounded-2xl overflow-hidden shadow-2xl  
        hover:scale-102
        w-60 h-80 cursor-pointer
        transition-all flex flex-col
        ${
          selectedPartyId === party.id
            ? "border border-green-600 hover:border-green-600/70"
            : "hover:border hover:border-primary/60"
        }`}
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
            className={`pl-3 mb-4 grow flex-1 border-l-4 
            ${
              selectedPartyId === party.id
                ? "border-green-600"
                : "border-primary"
            }`}
          >
            <h3 className="text-xl font-black mb-1">{party.name}</h3>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={() => handlePartySelect(party.id)}
              className={`w-full py-4 rounded-xl 
              ${
                selectedPartyId === party.id
                  ? "bg-green-600 hover:bg-green-600/80"
                  : "bg-primary hover:bg-primary/80"
              }
              text-white font-black text-lg active:scale-[0.98] transition-all 
              shadow-md flex items-center justify-center gap-2`}
            >
              {selectedPartyId === party.id ? "Selected" : "Select Party"}
              <span className="material-symbols-outlined">check_circle</span>
            </button>
          </div>
        </div>
      </div>
    );
  });

  const partyGrid = (
    <div className="flex flex-wrap justify-center items-center content-center gap-10 py-6 w-full">
      {dynamicDemoPartyGrid}
    </div>
  );

  const floatingNavigatorPR =
    selectedPartyId !== null &&
    (() => {
      const party = parties.find((p) => p.id === selectedPartyId);
      if (!party) return null;

      return (
        <div
          className="fixed bottom-8 right-8 w-80 bg-white
        dark:bg-slate-800 rounded-2xl shadow-2xl 
        border border-transparent p-6 flex flex-col gap-4 animate-slide-up"
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl">
              <ElectionSymbol symbol={party.symbol} />
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-bold">{party.name}</div>
              <p className="text-sm text-primary font-bold tracking-wide uppercase">
                Proportional Representation
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300">
            You have selected this party. You can now proceed to the next step.
          </p>

          <button
            className="w-full py-3 rounded-xl bg-primary text-white font-black text-lg
          hover:bg-primary/90 hover:scale-102 active:scale-[0.98] transition-all 
          shadow-md flex items-center justify-center gap-2"
            onClick={handleNext}
          >
            Proceed to Review
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      );
    })();

  const reviewElements = (
    <div className="max-w-2xl mx-auto w-full space-y-8 p-1">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Review Your Ballot
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Double-check your selections. This action is irreversible.
        </p>
      </div>

      <div className="space-y-6">
        {/* FPTP Card */}
        <section className="relative group">
          <span className="absolute -top-3 left-6 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full z-10 shadow-sm">
            First-past-the-post (FPTP)
          </span>
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all hover:border-blue-500/50 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-6 border-l-4 border-primary pl-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-6xl text-slate-400">
                    person
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-900 rounded-xl shadow-md flex items-center justify-center p-1.5 border border-slate-100 dark:border-slate-800">
                  <div className="w-full h-full">
                    <ElectionSymbol symbol={selectedCandidate?.symbol} />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {selectedCandidate?.name || "No Selection"}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mt-1">
                  {selectedCandidate?.party}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PR Card */}
        <section className="relative group">
          <span className="absolute -top-3 left-6 bg-purple-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full z-10 shadow-sm">
            Proportional (PR)
          </span>
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all hover:border-purple-500/50 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-6 border-l-4 border-primary pl-5">
              <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 p-4">
                <div className="w-full h-full object-contain text-5xl">
                  <ElectionSymbol symbol={selectedParty?.symbol} />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {selectedParty?.name || "No Selection"}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                  Political Party Selection
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Logic */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4 flex gap-3">
        <span className="material-symbols-outlined text-amber-600 dark:text-amber-500">
          warning
        </span>
        <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
          By clicking submit, you acknowledge that your choice is final. Your
          identity remains anonymous throughout the encrypted tallying process.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <button
          className="order-2 md:order-1 py-4 px-8 rounded-2xl font-bold text-slate-600
         dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all 
         active:scale-95 flex items-center justify-center gap-2"
          onClick={handleNext}
        >
          <span className="material-symbols-outlined text-xl">edit_note</span>
          Modify Selection
        </button>
        <button
          className="order-1 md:order-2 py-4 px-8 rounded-2xl bg-blue-600
         hover:bg-blue-700 text-white font-black text-lg shadow-lg shadow-blue-500/30 
         transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
          onClick={submitVote}
        >
          Confirm & Submit
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="flex flex-col p-6 w-full max-w-7xl space-y-6 
    mx-auto bg-background-light dark:bg-background-dark 
     rounded-3xl  flex-1 "
    >
      <VotingProcessStatusCard />

      {currentVotingState === "fptp" && (
        <>
          {pageHeadingFPTP}
          {instructionsAndSecurityBadgeFPTP}
          {searchBar}
          <div className="flex flex-col justify-center items-center w-full">
            {candidateGrid}
          </div>
          {selectedCandidateId ? floatingNavigatorFPTP : null}
        </>
      )}

      {currentVotingState === "pr" && (
        <>
          {pageHeadingPR}
          {instructionsAndSecurityBadgePR}
          {searchBar}
          <div className="flex flex-col justify-center items-center w-full">
            {partyGrid}
          </div>
          {selectedCandidateId ? floatingNavigatorPR : null}
        </>
      )}
      {currentVotingState === "review" && (
        <>
          <div className="flex flex-col justify-center items-center w-full">
            {reviewElements}
          </div>
        </>
      )}

      {currentVotingState === "successful" && (
        <>
          <VotingStatusCard status="successful" />
        </>
      )}
      {currentVotingState === "failed" && (
        <>
          <VotingStatusCard status="failed" />
        </>
      )}
    </div>
  );
}
