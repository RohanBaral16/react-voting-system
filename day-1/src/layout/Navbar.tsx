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
        // <section className="bg-[#FFFFFA]">
        //     <div 
        //     className="w-full md:h-15 
        //     flex flex-col 
        //     justify-between 
        //     items-center
        //     text-center
        //     bg-[#0D5C63]
        //     sm:flex-row sm:mx-0

        //     rounded-b-3xl px-10 py-2
        //     ">
        //         <div className="text-2xl font-bold text-[#FFFFFA] ">
        //             <Link to='/dashboard'><h1 className="flex items-center gap-2 w-32.5"><FaVoteYea />E-Voting</h1></Link>
        //         </div>


        //         <div 
        //         className="
        //         flex  justify-center  mt-2
        //         flex-row flex-wrap text-[#FFFFFA]
        //         gap-4
        //         items-center
        //         sm:mt-0
        //         "
        //         >
        //             {user===null &&(
        //                 <>
        //                     <Link to='/about'>About Us</Link>
        //                     <Link to='/Contact'>Contact</Link>
        //                     <Link to='/manual'>Voting Manual</Link>
        //                 </>
        //             )}
        //             {
        //                 user && 

        //                 <>
        //                     <p className={paragraphItemsClass}>Welcome, <span className="font-bold">{user?.name}</span></p>
        //                     <p className={paragraphItemsClass}>Voter ID: <span className="font-bold">{user?.voterId}</span></p>
        //                     <div className="flex justify-center gap-2 items-center">
        //                         <p className={paragraphItemsClass}>Verfied <span><MdVerified className="text-green-500"/></span></p>
        //                         <Button onClick={async()=>{userLogOut()}} variant="secondary">Logout</Button>
        //                     </div>
        //                 </>

        //             }
        //         </div>
        //     </div>
        // </section>


    <header className="w-full border-b border-solid
     border-slate-200 dark:border-slate-800 bg-white
      dark:bg-slate-900 px-4 md:px-20 lg:px-40 py-3 
      sticky top-0 z-50"
      >

  <div className="max-w-300 mx-auto flex items-center 
  justify-center sm:justify-between   flex-wrap sm:gap-20"
  >
    <div className="flex items-center gap-4 
    text-[#0d131b] dark:text-white ">
      
      <div>
        <h2 className="text-sm md:text-lg font-bold leading-tight tracking-tight">
          National Election Commission
        </h2>
        <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-widest">
          Nepal Official Portal
        </p>
      </div>
    </div>
    <div className="flex flex-1 justify-center sm:justify-end gap-4 md:gap-8 items-center">
      <nav className="flex items-center gap-9">
        {/* <a
          className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
          href="#"
        >
          Home
        </a> */}
        <Link  
            className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
            to='/dashboard'
        >Home</Link>
        
        <a
          className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
          href="#"
        >
          FAQ
        </a>
        {/* <a
          className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
          href="#"
        >
          Support
        </a> */}
        <Link  
            className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
            to='/manual'
        >Voting Manual</Link>
      </nav>
      <div className="bg-slate-200 dark:bg-slate-700 aspect-square rounded-full size-10 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600">
        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
          person
        </span>
      </div>
    </div>
  </div>
</header>

    )


}