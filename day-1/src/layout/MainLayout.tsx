import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

export default function MainLayout(){
    return(
        <div className="flex flex-col h-screen">
            <Navbar/>
            <Outlet/>
            {/* <Footer/> */}
        </div>
    )
}