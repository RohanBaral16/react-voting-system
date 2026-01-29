import { useEffect, useState } from "react";
type RegistrationProgressBarProps = {
  stepStatus?: {
    personal: "in-progress" | "pending" | "completed";
    location: "in-progress" | "pending" | "completed";
    security: "in-progress" | "pending" | "completed";
    review: "in-progress" | "pending" | "completed";
  };
};

export default function RegistrationProgressBar({
  stepStatus = {
    personal: "in-progress",
    location: "pending",
    security: "pending",
    review: "pending",
  },
}: RegistrationProgressBarProps) {
  // Logic-based variables
  const [progress, setProgress] = useState<number>(0); // Assuming this is calculated based on stepStatus

  let determinedState = { step: 1, stateName: "Personal Information" };
  // recalculated variable for step
  const determineState = () => {
    if (stepStatus.personal === "in-progress") {
      determinedState = { step: 1, stateName: "Personal Information" };
    }
    if (stepStatus.location === "in-progress") {
      determinedState = { step: 2, stateName: "Location Information" };
    }
    if (stepStatus.security === "in-progress") {
      determinedState = { step: 3, stateName: "Security Details" };
    }
    if (stepStatus.review === "in-progress") {
      determinedState = { step: 4, stateName: "Review Data" };
    }
  };
  determineState();

  useEffect(() => {
    if (
      stepStatus.personal === "completed" &&
      stepStatus.location === "in-progress"
    ) {
      setProgress(33);
    } else if (
      stepStatus.personal === "completed" &&
      stepStatus.location === "completed" &&
      stepStatus.security === "in-progress"
    ) {
      setProgress(66);
    } else if (
      stepStatus.personal === "completed" &&
      stepStatus.location === "completed" &&
      stepStatus.security === "completed"
    ) {
      setProgress(99);
    } else {
      setProgress(0); // fallback if none match
    }
  }, [stepStatus]);

  // Reusable Tailwind Class Constants
  const STYLES = {
    container:
      "w-full bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800",
    header: "flex gap-6 justify-between items-center",
    stepText:
      "text-slate-900 dark:text-white text-base font-semibold leading-normal",
    percentage:
      "text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal",
    progressTrack:
      "rounded-full bg-slate-100 dark:bg-slate-800 h-2 overflow-hidden",
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
            <span className="text-primary dark:text-white font-bold">
              Step {determinedState.step}:
            </span>
            <p className={STYLES.stepText}>{determinedState.stateName}</p>
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
          <div
            className={`
            ${STYLES.stepWrapper} 
            ${stepStatus.personal === "completed" ? "text-emerald-600 dark:text-emerald-500" : ""}
            ${stepStatus.personal === "in-progress" ? "text-blue-500" : ""}
        `}
          >
            <span className={STYLES.icon}>
              {stepStatus.personal === "completed" ? "check_circle" : null}
            </span>
            <span className={STYLES.icon}>person</span>
            <p className="hidden sm:block">Personal Info</p>
          </div>

          {/* Location - Active */}
          <div
            className={`
            ${STYLES.stepWrapper} 
            font-bold
            ${stepStatus.location === "completed" ? "text-emerald-600 dark:text-emerald-500" : ""}
            ${stepStatus.location === "in-progress" ? "text-blue-500" : ""}
            ${stepStatus.location === "pending" ? "text-primary dark:text-slate-300" : ""}
        `}
          >
            <span className={STYLES.icon}>
              {stepStatus.location === "completed" ? "check_circle" : null}
            </span>
            <span className={STYLES.icon}>location_on</span>
            <p className="hidden sm:block">Location Info</p>
          </div>

          {/* Security - Pending */}
          <div
            className={`
                ${STYLES.stepWrapper} 
                font-bold
                ${stepStatus.security === "completed" ? "text-emerald-600 dark:text-emerald-500" : ""}
                ${stepStatus.security === "in-progress" ? "text-blue-500" : ""}
                ${stepStatus.security === "pending" ? "text-primary dark:text-slate-300" : ""}
            `}
          >
            <span className={STYLES.icon}>
              {stepStatus.security === "completed" ? "check_circle" : null}
            </span>
            <span className={STYLES.icon}>lock</span>
            <p className="hidden sm:block">Security</p>
          </div>

          <div
            className={`
                ${STYLES.stepWrapper} 
                font-bold
                ${stepStatus.review === "completed" ? "text-emerald-600 dark:text-emerald-500" : ""}
                ${stepStatus.review === "in-progress" ? "text-blue-500" : ""}
                ${stepStatus.review === "pending" ? "text-primary dark:text-slate-300" : ""}
            `}
          >
            <span className={STYLES.icon}>rate_review</span>
            <p className="hidden sm:block">Review</p>
          </div>
        </div>
      </div>
    </div>
  );
}
