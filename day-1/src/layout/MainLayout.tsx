import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <main
      className="flex flex-col min-h-screen
       bg-[url(/images/background_light.webp)]
       dark:bg-[url(/images/background_dark.webp)]
       bg-cover bg-center bg-fixed
        text-slate-900 dark:text-slate-100 
    transition-colors duration-500 "
    >
      <Navbar />
      <div className="flex flex-col flex-1 bg-inherit">
        <Outlet />
      </div>
      <footer className="w-full ">
        <Footer />
      </footer>
    </main>
  );
}
