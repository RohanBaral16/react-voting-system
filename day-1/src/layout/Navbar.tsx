import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { useContext } from "react"
import Button from "../components/ui/button"
import { FaVoteYea } from "react-icons/fa";
import { MdVerified } from "react-icons/md";


export default function Navbar(){
    const {user, logout} = useContext(AuthContext)

    const paragraphItemsClass = "flex justify-center gap-2 items-center"

    async function userLogOut(){
        try{
            await logout()
        }catch(err: any){
            console.log('Logout error: ', err)
        }
    }


    return(
        <section className="bg-[#FFFFFA]">
            <div 
            className="w-full md:h-15 
            flex flex-col 
            justify-between 
            items-center
            text-center
            bg-[#0D5C63]
            sm:flex-row sm:mx-0

            rounded-b-3xl px-10 py-2
            ">
                <div className="text-2xl font-bold text-[#FFFFFA] ">
                    <Link to='/dashboard'><h1 className="flex items-center gap-2 w-32.5"><FaVoteYea />E-Voting</h1></Link>
                </div>


                <div 
                className="
                flex  justify-center  mt-2
                flex-row flex-wrap text-[#FFFFFA]
                gap-4
                items-center
                sm:mt-0
                "
                >
                    {user===null &&(
                        <>
                            <Link to='/about'>About Us</Link>
                            <Link to='/Contact'>Contact</Link>
                            <Link to='/manual'>Voting Manual</Link>
                        </>
                    )}
                    {
                        user && 

                        <>
                            <p className={paragraphItemsClass}>Welcome, <span className="font-bold">{user?.name}</span></p>
                            <p className={paragraphItemsClass}>Voter ID: <span className="font-bold">{user?.voterId}</span></p>
                            <div className="flex justify-center gap-2 items-center">
                                <p className={paragraphItemsClass}>Verfied <span><MdVerified className="text-green-500"/></span></p>
                                <Button onClick={async()=>{userLogOut()}} variant="secondary">Logout</Button>
                            </div>
                        </>

                    }
                </div>
            </div>
        </section>
    )
}