import VotingProcessStatusCard from "../voting/components/VotingProcessStatusCard";
import ElectionSymbol from "./ElectionSymbol";
import { useState } from "react";

export default function DemoBooth() {
  const [selectedCandidateId, setselectedCandidateId] = useState<number | null>(
    null,
  );
  const [searchString, setSearchString] = useState<string | null>(null);

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

  const pageHeadingPR = (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          Candidate Selection - FPTP
        </h1>
        <p className="text-[#4c6c9a] dark:text-[#8ba7cf] text-lg font-medium">
          House of Representatives: Demo Constituency No. 1
        </p>
      </div>
    </div>
  );

  const instructionsAndSecurityBadge = (
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

  const handleSelect = (id: number) => {
    if (selectedCandidateId === id) {
      setselectedCandidateId(null);
    } else {
      setselectedCandidateId(id);
    }
  };

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

  const dynamicDemoCandidateGrid = candidates.map((cand) => {
    if (searchString) {
      const searchLower = searchString.toLowerCase();
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
        className="bg-white dark:bg-slate-800 
     rounded-2xl overflow-hidden shadow-2xl border 
     border-transparent hover:border-primary/30
     w-70 h-90
     transition-all flex flex-col"
      >
        <div className="relative h-40 bg-slate-200 dark:bg-slate-700">
          <div
            className="absolute inset-0 bg-cover bg-center flex justify-center items-center"
            data-alt={`Portrait of candidate ${cand.name}`}
          >
            <span className="material-symbols-outlined text-9xl!">
              account_circle
            </span>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-lg shadow-md backdrop-blur-sm ">
            <div
              className="size-12 text-5xl flex justify-center items-center overflow-hidden"
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
            <h3 className="text-2xl font-black mb-1">{cand.name}</h3>
            <p className="text-primary font-bold text-sm tracking-wide uppercase">
              {cand.party}
            </p>
          </div>
          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 ">
            <button
              onClick={() => handleSelect(cand.id)}
              className={`w-full py-4 rounded-xl 
              ${selectedCandidateId === cand.id ? "bg-green-600 hover:bg-green-600/80" : "bg-primary hover:bg-primary/80"}
           text-white font-black text-lg active:scale-[0.98] transition-all 
           shadow-md flex items-center justify-center gap-2`}
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

  const floatingNavigator =
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
            className="w-full py-3 rounded-xl bg-primary text-white font-black text-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            // onClick={handleNext} // handle later
          >
            Proceed
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      );
    })();

  return (
    <div
      className="flex flex-col p-6 w-full max-w-7xl space-y-6 
    mx-auto bg-background-light dark:bg-background-dark 
     rounded-3xl  flex-1 "
    >
      <VotingProcessStatusCard />
      {pageHeadingPR}
      {instructionsAndSecurityBadge}
      {searchBar}
      <div className="flex flex-col justify-center items-center w-full">
        {candidateGrid}
      </div>
      {selectedCandidateId ? floatingNavigator : null}
    </div>
  );
}
