import type { PropsWithChildren} from "react"

interface FeatureCardProps extends PropsWithChildren{}

export default function FeatureCard({children}:FeatureCardProps){
    return(
        <div className="
        flex flex-col
            size-30
            sm:size-50
        items-center justify-center bg-[#FFFFFF] border
         border-gray-100 rounded-4xl shadow-lg p-6 
         aspect-square hover:shadow-xl transsition
         hover:scale-105
         hover:ring-1 hover:ring-blue-100
         hover:bg-gray-100
         hover:cursor-pointer
         text-[#0D5C63]
         
         "
         role="button"
         >
                {children}
        </div>
    )
}