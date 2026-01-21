type RegistrationProgressBarProps ={
    progress: number,
    stepStatus: {
    personal: string;
    location: string;
    security: string;
}
}
export default function RegistrationProgressBar({progress, stepStatus}: RegistrationProgressBarProps ){

    return(
        <div className="w-full bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-6 justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-primary dark:text-white font-bold">Step 2:</span>
                            <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal">Location Information</p>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">66% Complete</p>
                    </div>
                    <div className="rounded-full bg-slate-100 dark:bg-slate-800 h-2 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }} ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-500">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Personal Info
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-slate-100">
                            <span className="material-symbols-outlined text-sm">location_on</span> Location
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                            <span className="material-symbols-outlined text-sm">lock</span> Security
                        </div>
                    </div>
                </div>
            </div>
    )
}