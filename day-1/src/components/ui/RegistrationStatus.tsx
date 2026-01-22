import { Link } from "react-router-dom"
import type { Dispatch, SetStateAction } from "react"
import { SiTicktick } from "react-icons/si";
import { HiXCircle } from "react-icons/hi";

export type StatusType = 'processing' | 'successful' | 'failed'
export interface RegistrationStatusProps  {
    status: StatusType,
    setStatus: Dispatch<SetStateAction<StatusType>>
}

export default function RegistrationStatus({status, setStatus}:RegistrationStatusProps){

    const resetRegStatus = ()=>(setStatus('processing'))

    return(
        <div className="flex justify-center items-center bg-inherit h-full">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl 
            p-8 shadow-lg space-y-6 mt-4 text-primary dark:text-white ">
                
                {/* Title */}
                <p className="flex items-center gap-2 text-lg font-semibold">
                    {status === 'successful'?
                        <SiTicktick className="text-emerald-400" /> 
                        : <HiXCircle className="text-red-500"/>
                    }Registration {status}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-400 dark:text-slate-300">
                    {status === 'successful' && "Your account has been successfully created. You can now log in using your credentials."}
                    {status === 'failed' && "There was an issue with your registration. Please try again or check your details."}
                </p>

                {/* Navigation buttons */}
                <div className="flex gap-4 justify-between">
                    <Link
                        onClick={resetRegStatus}
                        to='/login'
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
                    >
                        Go to Login
                    </Link>

                    <Link
                        onClick={resetRegStatus}
                        to='/register'
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium text-white transition-colors"
                    >
                        Go to Registration
                    </Link>
                </div>
            </div>
        </div>
    )
}
