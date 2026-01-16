import { Link } from "react-router-dom"
export default function Navbar(){
    return(
        <section className="bg-[#78CDD7]">
            <div 
            className="w-full md:h-15 
            bg-[#0D5C63]
            sm:flex
            rounded-b-3xl px-10 py-2
            justify-between
            items-center
            ">
                <div className="text-2xl font-bold text-[#FFFFFA]">
                    <Link to='/'><h1>E-Voting</h1></Link>
                </div>
                <div 
                className="
                sm:flex flex-row text-[#FFFFFA]
                gap-4
                "
                >
                    <Link to='/about'>About Us</Link>
                    <Link to='/Contact'>Contact</Link>
                    <Link to='/manual'>Voting Manual</Link>
                </div>
            </div>
        </section>
    )
}