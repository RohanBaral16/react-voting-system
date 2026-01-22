import { useEffect, useState } from "react";
type RegistrationProgressBarProps = {
  stepStatus?: {
    personal: 'in-progress'|'pending'|'completed';
    location: 'in-progress'|'pending'|'completed';
    security: 'in-progress'|'pending'|'completed';
  };
};


export default function RegistrationProgressBar({ stepStatus = {
    personal: 'in-progress',
    location: 'pending',
    security: 'pending'
} }: RegistrationProgressBarProps) {
  // Logic-based variables
  const [progress, setProgress] = useState<number>(0); // Assuming this is calculated based on stepStatus
    
  useEffect(() => {
    console.log('setting progress')
    console.log(stepStatus.personal, stepStatus.location, stepStatus.security)
    if (stepStatus.personal === "completed" && stepStatus.location === "in-progress") {
      setProgress(30);
    } else if (
      stepStatus.personal === "completed" &&
      stepStatus.location === "completed" &&
      stepStatus.security === "in-progress"
    ) {
      setProgress(60);
    } else if (
      stepStatus.personal === "completed" &&
      stepStatus.location === "completed" &&
      stepStatus.security === "completed"
    ) {
      setProgress(90);
    } else {
      setProgress(0); // fallback if none match
    }
  }, [stepStatus]);

  // Reusable Tailwind Class Constants
  const STYLES = {
    container: "w-full bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800",
    header: "flex gap-6 justify-between items-center",
    stepText: "text-slate-900 dark:text-white text-base font-semibold leading-normal",
    percentage: "text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal",
    progressTrack: "rounded-full bg-slate-100 dark:bg-slate-800 h-2 overflow-hidden",
    progressBar: "h-full rounded-full bg-blue-500 transition-all duration-500",
    stepWrapper: "flex items-center gap-1.5 text-xs font-medium",
    icon: "material-symbols-outlined text-sm",
  };

  return (
    <div className={STYLES.container}>
      <div className="flex flex-col gap-3">
        {/* Header Section */}
        <div className={STYLES.header}>
          <div className="flex items-center gap-2">
            <span className="text-primary dark:text-white font-bold">Step 2:</span>
            <p className={STYLES.stepText}>Location Information</p>
          </div>
          <p className={STYLES.percentage}>{progress}% Complete</p>
        </div>

        {/* Progress Bar */}
        <div className={STYLES.progressTrack}>
          <div 
            className={STYLES.progressBar} 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* Steps Indicators */}
        <div className="flex justify-between mt-1">
          {/* Personal Info - Completed */}
          <div className={`${STYLES.stepWrapper} text-emerald-600 dark:text-emerald-500`}>
            <span className={STYLES.icon}>check_circle</span> 
            Personal Info
          </div>

          {/* Location - Active */}
          <div className={`${STYLES.stepWrapper} font-bold text-primary dark:text-slate-100`}>
            <span className={STYLES.icon}>location_on</span> 
            Location
          </div>

          {/* Security - Pending */}
          <div className={`${STYLES.stepWrapper} text-slate-400`}>
            <span className={STYLES.icon}>lock</span> 
            Security
          </div>
        </div>
      </div>
    </div>
  );
}