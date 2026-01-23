import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
export default function VoterInfo(){
    const {user} = useContext(AuthContext)
    console.log('inside voterinfo')
    console.log(user)
    return(
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-64 h-full opacity-5 pointer-events-none">
        <svg
            className="h-full w-full"
            fill="currentColor"
            viewBox="0 0 100 100"
        >
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
    </div>

    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
        <div className="size-24 md:size-32 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-900 shadow-md">
            <img
                className="w-full h-full object-cover"
                alt="Voter official identification photo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-nHRMFg-deqkO_0MF-GJPoyzdCxmsy7uLXGszSJwKLxzKS9xLCRAx7pdcOe87vD7Q9_FKmq5PAlTgWXFvv1QsK1SEAsptT-MhX-Ppj3SsSXM9owcsieguOE07CQAJANGLzbL-FYH9Gt_Bh79uoDTNyoWmsUUb45hZyVn-cksaFLQxwXMA1Ih2oSwOnm3svFYAUr5ejODtqx9R3gFNyrkFwrwbSFQ85eF5V11Rs-PzRnT7VJv-DV3YYQ6TonSgDwsYEMIx1yuBDRtg"
            />
        </div>

        <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                {/* when backend is ready pull details here */}
                <h1 className="text-3xl font-extrabold tracking-tight">
                    Name Here 
                </h1>

                <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase justify-center items-center">
                    General Voter
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="material-symbols-outlined text-sm">
                        badge
                    </span>
                    <span className="text-sm font-medium">
                        Email ID:  {''}
                        <span className="text-slate-900 dark:text-white font-bold">
                            {user?.username}
                        </span>
                    </span>
                </div>

                <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="material-symbols-outlined text-sm">
                        location_on
                    </span>
                    <span className="text-sm font-medium">
                        {`${user?.province?.name} Province, ${user?.district?.name} District, ${user?.electoral_area?.name}`}
                    </span>
                </div>

                <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="material-symbols-outlined text-sm">
                        how_to_reg
                    </span>
                    <span className="text-sm font-medium">
                        Voter ID:  {" "}
                        <span className="text-slate-900 dark:text-white font-bold">
                            NP-KTM-2023-0092
                        </span>
                    </span>
                </div>

                <div className="flex items-center gap-2 justify-center md:justify-start text-primary">
                    <span className="material-symbols-outlined text-sm">
                        event
                    </span>
                    <span className="text-sm font-bold italic underline">
                        General Election 2026
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>

    )
}