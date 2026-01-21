export default function RegistrationProgressBar(){
    return(
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-6 justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold">Step 2:</span>
                            <p className="text-slate-900  text-base font-semibold leading-normal">Location Information</p>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-normal">66% Complete</p>
                    </div>
                    <div className="rounded-full bg-slate-100 h-2 overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: '66.6%' }} ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 ">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Personal Info
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
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