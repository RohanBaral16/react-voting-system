import type { PropsWithChildren} from "react"

interface FeatureCardProps extends PropsWithChildren{}

export default function FeatureCard({children}:FeatureCardProps){
    return(
        <div className="
        flex flex-col size-50
        items-center justify-center bg-[FFFFEE] border
         border-gray-100 rounded-4xl shadow-lg p-6 
         aspect-square hover:shadow-xl transition
         hover:scale-105
         hover:bg-gray-100
         hover:cursor-pointer
         text-[#0D5C63] 
         focus:outline-none focus:ring-2 focus:ring-blue-500
         "
         tabIndex={0}
         role="button"
         >
                {children}
        </div>
    )
}