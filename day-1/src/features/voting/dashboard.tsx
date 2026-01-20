import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import FeatureCard from "../../components/ui/FeatureCard"
import { MdHowToVote, MdOutlineBallot } from "react-icons/md"
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom"
import { FaChartPie, FaUserGear  } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

import type{ IconType } from "react-icons"

interface DashboardItems {
  to: string,
  label: string;
  icon: IconType; 
}


export default function Dashboard(){
    const{user, loading} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        if(loading){
            return
        }
        if(!user){
            navigate('/login')
        }
    }, [user, navigate, loading])

     const cardLinkStyle = "block rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-105 transition-transform"

    const dashboardItems:DashboardItems[] = [
        {
            to:'vote',
            label: 'Vote',
            icon: MdHowToVote
        },{
            to:'/ballot-info',
            label:'E-Ballot Information',
            icon: MdOutlineBallot
        },
        {
            to:'/candidates-info',
            label:'Candidates Information',
            icon: FaPeopleGroup 
        },{
            to:'/election-results',
            label:'Election Results',
            icon: FaChartPie
        },{
            to:'/election-info',
            label:'Election Info',
            icon: FaInfoCircle
        },{
            to:'voter-info',
            label:'Voter Information',
            icon: FaUserGear
        }

    ]

    const dashboardItemsElements = dashboardItems.map((item, index)=>{
        const Icon = item.icon
        return(
            <Link
                className={cardLinkStyle}
                {...(index===0 && {tabIndex : 0})}
                to={item.to}
            >
                <FeatureCard>
                <Icon className='text-[50px] sm:text-[80px]'/>
                <p className="text-sm font-bold sm:text-lg text-center mt-2 w-full text-wrap truncate">{item.label}</p>
                </FeatureCard>
        </Link>
        )
    })

    
   

    return(
        // population feature cards
        <div className="flex flex-wrap
        w-full h-full p-5 pt-10 \
        gap-10 border border-red-600 
        justify-center items-start content-start
        bg-[#FFFFFA]">
            {dashboardItemsElements}
        </div>
    ) 
}