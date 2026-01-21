import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

export default function MainLayout(){
    return(
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-800">
            <Navbar/>
            <div className="flex-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}