import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import FeatureCard from "../../components/ui/FeatureCard"
import { MdHowToVote } from "react-icons/md"

export default function Dashboard(){
    const{user, loading, logout} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        if(loading){
            return
        }
        if(!user){
            navigate('/login')
        }
    }, [user, navigate, loading])

    const featureCardIconStyle = ''
    const featureCardTextStyle = ''

    return(
        // population feature cards
        <div className="flex flex-wrap w-full p-5 pt-10 \
        gap-10 border border-red-600 
        justify-center items-center
        ">
            <FeatureCard>
                <MdHowToVote className="text-[80px]"/>
                <p className="font-bold text-[px]">Vote</p>
            </FeatureCard>
            <FeatureCard>
                <MdHowToVote className="text-[80px]"/>
                <p className="font-bold text-[px]">Vote</p>
            </FeatureCard>
            <FeatureCard>
                <MdHowToVote className="text-[80px]"/>
                <p className="font-bold text-[px]">Vote</p>
            </FeatureCard>
            <FeatureCard>
                <MdHowToVote className="text-[80px]"/>
                <p className="font-bold text-[px]">Vote</p>
            </FeatureCard>
            <FeatureCard>
                <MdHowToVote className="text-[80px]"/>
                <p className="font-bold text-[px]">Vote</p>
            </FeatureCard>
            <FeatureCard>
                <MdHowToVote className="text-[80px]"/>
                <p className="font-bold text-[px]">Vote</p>
            </FeatureCard>
            <FeatureCard>
                <MdHowToVote className="text-[80px]"/>
                <p className="font-bold text-[px]">Vote</p>
            </FeatureCard>
            <FeatureCard>
                <MdHowToVote className="text-[80px]"/>
                <p className="font-bold text-[px]">Vote</p>
            </FeatureCard>
        </div>
    ) 
}