import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="w-full flex-1 flex items-center justify-center px-4 py-14">
      <div className="max-w-2xl w-full">
        <div className="space-y-8 text-center">
          {/* 404 Display */}
          <div className="relative">
            <div className="text-9xl md:text-[160px] font-black text-primary/10 leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-7xl md:text-8xl text-primary">
                public
              </span>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Page Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have
              been removed, renamed, or you may have mistyped the URL.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">What you can do</h3>
                <span className="material-symbols-outlined text-primary">
                  info
                </span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 text-left">
                <li className="flex gap-2">
                  <span className="material-symbols-outlined text-primary text-base flex-shrink-0">
                    home
                  </span>
                  Return to the home page and explore features
                </li>
                <li className="flex gap-2">
                  <span className="material-symbols-outlined text-primary text-base flex-shrink-0">
                    help
                  </span>
                  Visit our FAQ or contact support
                </li>
                <li className="flex gap-2">
                  <span className="material-symbols-outlined text-primary text-base flex-shrink-0">
                    search
                  </span>
                  Check the URL for typos
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition-all"
            >
              Back to Home
            </Link>
            <Link
              to="/faq"
              className="px-6 py-3 rounded-xl border dark:border-slate-700
               text-slate-900 dark:text-white font-bold hover:border-primary/60 
               transition-all bg-slate-50/50 dark:bg-slate-900/80"
            >
              Visit FAQ
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl border dark:border-slate-700
               text-slate-900 dark:text-white font-bold hover:border-primary/60 
               transition-all bg-slate-50/50 dark:bg-slate-900/80"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
