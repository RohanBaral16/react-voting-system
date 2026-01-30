import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="w-full flex-1 flex items-center justify-center px-4 py-14">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            Secure • Transparent • Inclusive
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            <span className="typewriter">
              A trusted digital gateway for Nepal’s elections
            </span>
          </h2>
          <p
            className="text-slate-800 dark:text-slate-300 text-lg 
          leading-relaxed lg:max-w-xl bg-slate-50/80 dark:bg-slate-900/80 border-l-10
           border-blue-500 px-5 py-2 rounded-lg "
          >
            <span className="typewriter typewriter-delay">
              Explore candidates, verify your voter status, and experience the
              voting process through secure, user‑friendly tools built for
              transparency and public trust.
            </span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/results"
              className="px-6 py-3 rounded-xl border  dark:border-slate-700
               text-slate-900 dark:text-white font-bold hover:border-primary/60 
               transition-all bg-slate-50/50 dark:bg-slate-900/80 border-l-10
           border-blue-500"
            >
              View Results
            </Link>
            <Link
              to="/demovote"
              className="px-6 py-3 rounded-xl border  dark:border-slate-700
               text-slate-900 dark:text-white font-bold hover:border-primary/60 
               transition-all
               bg-slate-50/50 dark:bg-slate-900/80 border-l-10
           border-blue-500"
            >
              Demo Booth
            </Link>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Platform Highlights</h3>
              <span className="material-symbols-outlined text-primary">
                verified
              </span>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  lock
                </span>
                End‑to‑end encrypted demo voting flow
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  monitoring
                </span>
                Live results dashboard with insights
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  ballot
                </span>
                Ballot info and candidate profiles in one place
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
