const linkBase = "text-slate-500  dark:text-slate-400";

const separatorIcon = "material-symbols-outlined text-slate-400 text-lg";

export default function VotingProcessStatusCard() {
  return (
    <nav className="flex text-sm border-t border-slate-100 dark:border-slate-800">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {/* Home */}
        <li className="inline-flex items-center">
          <p className={`${linkBase} flex items-center text-lg`}>
            <span className="material-symbols-outlined mr-1 text-2xl!">
              home
            </span>
            Home
          </p>
        </li>

        {/* FPTP */}
        <li>
          <div className="flex items-center">
            <span className={separatorIcon}>chevron_right</span>
            <p className={`${linkBase} ml-1 md:ml-2 text-lg`}>
              <span className="md:hidden">FPTP</span>
              <span className="hidden md:inline">
                First-past-the-post Voting (FPTP)
              </span>
            </p>
          </div>
        </li>

        {/* PR Party Voting */}
        <li>
          <div className="flex items-center">
            <span className={separatorIcon}>chevron_right</span>
            <p className={`${linkBase} ml-1 md:ml-2 text-lg`}>
              <span className="lg:hidden">PR</span>
              <span className="hidden lg:inline">
                Proportional Representative Party Voting
              </span>
            </p>
          </div>
        </li>

        {/* Review Votes */}
        <li>
          <div className="flex items-center">
            <span className={separatorIcon}>chevron_right</span>
            <p className={`${linkBase} ml-1 lg:ml-2 text-lg`}>
              <span className="lg:hidden">Review</span>
              <span className="hidden lg:inline">Review Votes</span>
            </p>
          </div>
        </li>
      </ol>
    </nav>
  );
}
