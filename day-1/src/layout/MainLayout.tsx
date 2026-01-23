import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-200 
    dark:bg-background-dark text-slate-900 dark:text-slate-100 
    transition-colors duration-500">
      <Navbar />
      <div className="flex-1 bg-inherit">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}