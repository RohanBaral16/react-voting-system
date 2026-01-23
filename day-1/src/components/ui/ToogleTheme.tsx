import { useState, useEffect } from 'react';
import { LuSun, LuMoon } from "react-icons/lu";

function ToggleTheme() {
  // Initialize state based on what's already on the document or system
  const [theme, setTheme] = useState(() => {
    if (document.documentElement.classList.contains('dark')) return 'dark';
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    console.log("Current Theme State:", theme); // DEBUG: Check your console!
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-zinc-100 dark:bg-slate-800 
        transition-colors"
    >
      {/* {theme === 'dark' ? <LuSun className="text-yellow-400" /> : <LuMoon className="text-blue-500" />} */}
        <div className=' bg-slate-200 rounded-full p-1.5 dark:bg-transparent shawdow-1xl dark:shadow-none'>
            <LuSun className="text-primary dark:text-white" />
        </div>
        <div className=' rounded-full p-1.5 dark:bg-slate-700'>
            <LuMoon className="text-primary dark:text-white" />
        </div>
    </button>
  );
}

export default ToggleTheme;