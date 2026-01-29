import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import ToggleTheme from "../components/ui/ToogleTheme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function userLogOut() {
    try {
      await logout();
      navigate("/");
    } catch (err: any) {
      console.log("Logout error: ", err);
    }
  }

  return (
    <header
      className="w-full 
      shadow-2xl backdrop-blur-3xl 
      px-4 md:px-5 
lg:px-10 py-3 sticky top-0 z-50"
    >
      <div className="w-full mx-auto flex items-center justify-between group/container">
        {/* Logo - Always visible */}
        <Link to="/dashboard">
          <div className="flex items-center gap-4  mr-5">
            <div>
              <h2 className="text-sm md:text-lg font-bold leading-tight text-slate-950 dark:text-slate-50 tracking-tight transition-colors">
                National Election Commission
              </h2>
              <p className="text-[10px] md:text-xs font-medium text-slate-700 dark:text-slate-50/70 uppercase tracking-widest">
                Nepal Official Portal
              </p>
            </div>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        {/* hidden on mobile, flex on sm and up */}
        <div className="hidden md:flex justify-end gap-4 md:gap-8 items-center">
          <nav className="flex items-center gap-9">
            <Link
              className=" text-sm font-medium hover:text-primary transition-colors"
              to={user ? "/login" : "/dashboard"}
            >
              {user ? "Dashboard" : "Login"}
            </Link>
            <Link
              className=" text-sm font-medium hover:text-primary transition-colors"
              to={user ? "/faq" : "/register"}
            >
              {user ? "FAQ" : "Register"}
            </Link>
            <Link
              className=" text-sm font-medium hover:text-primary transition-colors"
              to="/demovote"
            >
              Demo Booth
            </Link>
            <Link
              className=" text-sm font-medium hover:text-primary transition-colors"
              to="/contact"
            >
              Contact Us
            </Link>
            {!user && (
              <Link
                className=" text-sm font-medium hover:text-primary transition-colors"
                to="/faq"
              >
                FAQ
              </Link>
            )}
          </nav>

          <div className="flex justify-center gap-2 items-center">
            {user && (
              <div className="flex gap-5 justify-end items-center">
                <div className="bg-slate-200 dark:bg-slate-700 aspect-square rounded-full size-10 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                    person
                  </span>
                </div>

                <button
                  onClick={async () => {
                    userLogOut();
                  }}
                  className="p-2 flex justify-center items-center
                            border border-slate-100 dark:border-slate-800
                            bg-zinc-100
                            dark:bg-slate-900
                             hover:bg-slate-400 dark:hover:bg-slate-800 rounded-full
                             text-slate-700 dark:text-slate-400 transition-colors
                             gap-2 
                             "
                >
                  <span className="material-symbols-outlined">logout</span>
                  <p>Logout</p>
                </button>
              </div>
            )}
            <ToggleTheme />
          </div>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        {/* hidden on desktop, flex on small screens */}
        <div className="flex md:hidden items-center gap-3">
          <ToggleTheme />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=" p-1 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* --- MOBILE OVERLAY MENU --- */}
        {isMenuOpen && (
          <div
            className="absolute top-full left-0 w-full
           bg-zinc-200 dark:bg-slate-900 border-b border-slate-700 
           p-6 flex flex-col gap-6 md:hidden shadow-xl animate-in fade-in slide-in-from-top-2
           text-slate-800 dark:text-slate-200
           "
          >
            <nav className="flex flex-col gap-5">
              <Link
                onClick={() => setIsMenuOpen(false)}
                className=" text-lg font-medium"
                to="/dashboard"
              >
                {user ? "Dashboard" : "Login"}
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                className=" text-lg font-medium"
                to={user ? "/faq" : "/register"}
              >
                {user ? "FAQ" : "Register"}
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                className=" text-lg font-medium"
                to="/demovote"
              >
                Demo Booth
              </Link>
              {!user && (
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className=" text-lg font-medium"
                  to="/faq"
                >
                  FAQ
                </Link>
              )}
            </nav>

            {user && (
              <div className="flex flex-col gap-4 pt-4 border-t border-slate-700">
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    userLogOut();
                  }}
                  className="px-3 py-2 flex justify-center items-center
                            border border-slate-100 dark:border-slate-800
                            bg-zinc-100
                            dark:bg-slate-900
                             hover:bg-slate-400 dark:hover:bg-slate-800 rounded-full
                              text-slate-700 dark:text-slate-400 transition-colors
                             gap-2 
                             "
                >
                  <span className="material-symbols-outlined">logout</span>
                  <p>Logout</p>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
