import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

export default function MainLayout(){
    return(
        <div className="flex flex-col h-screen">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}