import type { PropsWithChildren} from "react"

interface FeatureCardProps extends PropsWithChildren{}

export default function FeatureCard({children}:FeatureCardProps){
    return(
        <div className="rounded-4xl shadow-lg size-35 sm:size-50 flex justify-center items-center">
            <div className="
            flex flex-col
                size-34
                sm:size-49
            items-center justify-center  border
            border-gray-100 rounded-t-full rounded-b-full shadow-lg p-6 
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
        </div>
    )
}