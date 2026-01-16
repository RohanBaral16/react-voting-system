import { Link } from "react-router-dom"
import type { Dispatch, SetStateAction, PropsWithChildren } from "react"
import { SiTicktick } from "react-icons/si";


export type StatusType = 'processing' | 'successful' | 'failed'
export interface RegistrationStatusProps extends PropsWithChildren {
    status: StatusType,
    setStatus: Dispatch<SetStateAction<StatusType>>
}

export default function RegistrationStatus({status, setStatus}:RegistrationStatusProps){

    const resetRegStatus = ()=>(setStatus('processing'))

    return(
        <>
            
            <div className="grow flex items-center justify-center 
            bg-[#78CDD7]"
             >
                <div 
                    className="w-full max-w-125 bg-white border border-gray-200 rounded-xl p-8 shadow-lg space-y-6 mt-2"
                >
                        <p className="flex items-center gap-2"> <SiTicktick className='text-green-700'/> Registration {`${status}`}</p>
                        <div className="text-blue-700 flex gap-6" >
                            <Link onClick={()=>(resetRegStatus())} to='/login'>Go to Login</Link>
                            <Link onClick={()=>(resetRegStatus())} to='/register'>Go to Registration</Link>
                        </div>
                </div>
                
            </div>
        </>
    )
}