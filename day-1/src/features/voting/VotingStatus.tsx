export default function VotingStatus(){
    return(
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">ballot</span>
                        Voting Status
                </h2>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Update: Just now</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 
            rounded-xl flex items-center gap-4 group transition-all hover:border-primary/50">
            <div className="size-12 rounded-lg bg-red-100 dark:bg-transparent dark:border dark:border-red-400 flex items-center justify-center text-red-400">
            <span className="material-symbols-outlined text-3xl font-light">pending_actions</span>
            </div>
            <div className="flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">FPTP Candidate Ballot</p>
            <p className="text-xs text-slate-500">First Past The Post (Representative)</p>
            </div>
            <div className="px-3 py-1.5 bg-red-100 dark:bg-transparent  text-red-400 border border-accent-red/20 
            rounded-lg text-xs font-black uppercase tracking-tight">
                                    Not Voted
                                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
             p-5 rounded-xl flex items-center gap-4 group transition-all hover:border-primary/50">
            <div className="size-12 rounded-lg bg-red-100 dark:bg-transparent dark:border dark:border-red-400 flex items-center justify-center text-red-400">
            <span className="material-symbols-outlined text-3xl font-light">pending_actions</span>
            </div>
            <div className="flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">PR Party Ballot</p>
            <p className="text-xs text-slate-500">Proportional Representation</p>
            </div>
            <div className="px-3 py-1.5 bg-red-100 dark:bg-transparent text-red-400 border border-accent-red/20 rounded-lg text-xs font-black uppercase tracking-tight">
                                    Not Voted
                                </div>
            </div>
        </div>
    </div>
    )
}