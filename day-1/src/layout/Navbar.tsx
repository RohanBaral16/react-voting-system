import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { useContext } from "react"
import Button from "../components/ui/button"
import { FaVoteYea } from "react-icons/fa";


export default function Navbar(){
    const {user, logout} = useContext(AuthContext)

    async function userLogOut(){
        try{
            await logout()
        }catch(err: any){
            console.log('Logout error: ', err)
        }
    }


    return(
        <section className="bg-[#78CDD7]">
            <div 
            className="w-full md:h-15 text-center
            bg-[#0D5C63]
            sm:flex sm:mx-0
            rounded-b-3xl px-10 py-2
            justify-between
            items-center
            ">
                <div className="text-2xl font-bold text-[#FFFFFA]">
                    <Link to='/'><h1 className="flex items-center gap-2"><FaVoteYea />E-Voting</h1></Link>
                </div>


                <div 
                className="
                flex  justify-center  mt-2
                flex-row text-[#FFFFFA]
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
                            <p>Welcome, {user?.name}</p>
                            <Button onClick={async()=>{userLogOut()}} variant="secondary">Logout</Button>
                        </>

                    }
                </div>
            </div>
        </section>
    )
}