import { useEffect, useState } from "react";
import {
  getFPTPResult,
  getPRResult,
  type PartyResult,
  type CandidateResult,
} from "../../api/resultFetch";
import PartyResultCard from "../../components/ui/PartyResultCard";
import CandidateResultCard from "../../components/ui/CandidateResultCard";
import { locationData } from "../../demoData";

export default function ElectionResults() {
  const [prResults, setPrResults] = useState<PartyResult[]>([]);
  const [fptpResults, setFptpResults] = useState<CandidateResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pr" | "fptp">("pr");
  const [searchString, setSearchString] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const [prData, fptpData] = await Promise.all([
          getPRResult(),
          getFPTPResult(),
        ]);

        // Sort by total votes (descending)
        setPrResults(prData.sort((a, b) => b.total_votes - a.total_votes));
        setFptpResults(
          fptpData
            .filter((c) => c.candidate__id !== null) // Filter out null candidates
            .sort((a, b) => b.total_votes - a.total_votes),
        );
      } catch (err: any) {
        setError(err.message || "Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Election Results...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h3 className="font-bold text-lg mb-2">Error Loading Results</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const prTotalVotes = prResults.reduce((sum, r) => sum + r.total_votes, 0);
  const fptpTotalVotes = fptpResults.reduce((sum, r) => sum + r.total_votes, 0);
  const normalizedSearch = searchString ? searchString.toLowerCase() : "";

  const filteredPrResults = prResults.filter((result) => {
    if (!normalizedSearch) return true;
    return result.party__name.toLowerCase().includes(normalizedSearch);
  });

  const filteredFptpResults = fptpResults.filter((result) => {
    const matchesSearch = normalizedSearch
      ? (result.candidate__name || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        result.electoral_area__name.toLowerCase().includes(normalizedSearch)
      : true;

    const matchesConstituency = selectedConstituency
      ? result.electoral_area__name === selectedConstituency
      : true;

    return matchesSearch && matchesConstituency;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🗳️ Election Results 2026
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Live election results and vote counts
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab("pr")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "pr"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              PR Results (Party)
            </button>
            <button
              onClick={() => setActiveTab("fptp")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "fptp"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              FPTP Results (Candidate)
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="md:col-span-2">
            <label className="relative flex items-center w-full">
              <span className="absolute left-4 text-[#4c6c9a] material-symbols-outlined">
                search
              </span>
              <input
                value={searchString ? searchString : ""}
                onChange={(e) => setSearchString(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-white dark:bg-slate-800 shadow-sm focus:ring-2 focus:ring-primary text-base placeholder:text-[#4c6c9a]"
                placeholder={
                  activeTab === "pr"
                    ? "Search by party name..."
                    : "Search by candidate or constituency..."
                }
              />
              <button
                type="button"
                onClick={() => setSearchString(null)}
                className="absolute right-4 flex gap-2 bg-inhe justify-center items-center text-[#4c6c9a] hover:text-[#4c6c9a]/70 bg-white dark:bg-slate-800 rounded-md"
              >
                <span className="material-symbols-outlined">close</span>
                <p>Clear</p>
              </button>
            </label>
          </div>

          {activeTab === "fptp" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                  Province
                </label>
                <select
                  value={selectedProvince}
                  className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    setSelectedDistrict("");
                    setSelectedConstituency("");
                  }}
                >
                  <option value="">Select Province</option>
                  {Object.keys(locationData).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                  District
                </label>
                <select
                  value={selectedDistrict}
                  className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedConstituency("");
                  }}
                  disabled={!selectedProvince}
                >
                  <option value="">Select District</option>
                  {selectedProvince &&
                    Object.keys(locationData[selectedProvince]).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                  Electoral Area
                </label>
                <select
                  value={selectedConstituency}
                  className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
                  onChange={(e) => setSelectedConstituency(e.target.value)}
                  disabled={!selectedProvince || !selectedDistrict}
                >
                  <option value="">Select Electoral Area</option>
                  {selectedProvince &&
                    selectedDistrict &&
                    Object.keys(
                      locationData[selectedProvince][selectedDistrict],
                    ).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* PR Results */}
        {activeTab === "pr" && (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Proportional Representation Results
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Total Votes: <span className="font-bold">{prTotalVotes}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrResults.map((result, index) => (
                <PartyResultCard
                  key={result.party__id}
                  result={result}
                  rank={index + 1}
                  totalVotes={prTotalVotes}
                />
              ))}
            </div>
          </div>
        )}

        {/* FPTP Results */}
        {activeTab === "fptp" && (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                First Past The Post Results
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Total Votes: <span className="font-bold">{fptpTotalVotes}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFptpResults.map((result, index) => (
                <CandidateResultCard
                  key={result.candidate__id || `nota-${index}`}
                  result={result}
                  rank={index + 1}
                  totalVotes={fptpTotalVotes}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
