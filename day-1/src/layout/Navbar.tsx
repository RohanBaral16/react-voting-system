import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { useContext } from "react"
import Button from "../components/ui/button"
import ToggleTheme from "../components/ui/ToogleTheme"
import { useState } from "react"


export default function Navbar(){
    const {user, logout} = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    async function userLogOut(){
        try{
            await logout()
        }catch(err: any){
            console.log('Logout error: ', err)
        }
    }


    return(



<header className="w-full border-b border-solid border-slate-800 bg-slate-800 dark:bg-slate-900 px-4 md:px-5 lg:px-10 py-3 sticky top-0 z-50">
  <div className="w-full mx-auto flex items-center justify-between group/container">
    
      {/* Logo - Always visible */}
      <Link to='/dashboard'>
        <div className="flex items-center gap-4 text-white mr-5">
          <div>
            <h2 className="text-sm md:text-lg font-bold leading-tight tracking-tight">
              National Election Commission
            </h2>
            <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-widest">
              Nepal Official Portal
            </p>
          </div>
        </div>
      </Link>

      {/* --- DESKTOP NAVIGATION --- */}
      {/* hidden on mobile, flex on sm and up */}
      <div className="hidden md:flex justify-end gap-4 md:gap-8 items-center">
        <nav className="flex items-center gap-9">
          <Link className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" to={user?'/login':'/dashboard'}>{user?'Home': 'Login'}</Link>
          <Link className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" to={user?'#':'/register'}>{user?'FAQ': 'Register'}</Link>
          <Link className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" to='#'>Voting Manual</Link>
        </nav>

        <div className="flex justify-center gap-2 items-center">
          {user && (
            <div className="flex gap-5 justify-end items-center">
              <div className="bg-slate-200 dark:bg-slate-700 aspect-square rounded-full size-10 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">person</span>
              </div>
             
              <button
                            onClick={async () => { userLogOut() }}
                            className="p-2 flex justify-center items-center
                            border border-slate-100 dark:border-slate-800
                            bg-zinc-100
                            dark:bg-slate-900
                             hover:bg-slate-400 dark:hover:bg-slate-800 rounded-full
                             text-slate-700 dark:text-slate-400 transition-colors
                             gap-2 
                             "
                        >
                            <span className="material-symbols-outlined">
                                logout
                            </span>
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
          className="text-slate-300 p-1 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-800 dark:bg-slate-900 border-b border-slate-700 p-6 flex flex-col gap-6 md:hidden shadow-xl animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-5">
            <Link onClick={() => setIsMenuOpen(false)} className="text-slate-300 text-lg font-medium" to='/dashboard'>Home</Link>
            <Link onClick={() => setIsMenuOpen(false)} className="text-slate-300 text-lg font-medium" to='#'>FAQ</Link>
            <Link onClick={() => setIsMenuOpen(false)} className="text-slate-300 text-lg font-medium" to='#'>Voting Manual</Link>
          </nav>

          {user && (
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-3">
                <div className="bg-slate-700 aspect-square rounded-full size-10 flex items-center justify-center border border-slate-600">
                  <span className="material-symbols-outlined text-slate-400">person</span>
                </div>
                <span className="text-slate-300 text-sm">Profile</span>
              </div>
                     <button
                            onClick={async () => { 
                              setIsMenuOpen(false)
                              userLogOut()
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
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <p>Logout</p>
              </button>
            </div>
          )}
        </div>
      )}

  </div>
</header>

    )


}