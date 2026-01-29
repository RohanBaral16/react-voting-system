import { useForm } from "react-hook-form";
import Button from "../../components/ui/button";
import { locationData } from "../../demoData";
import RegistrationStatus, {
  type StatusType,
} from "../../components/ui/RegistrationStatus";
import { useState, useEffect } from "react";
import RegistrationProgressBar from "../../components/ui/RegistrationProgressBar";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { registerUser } from "../../api/authFetch";

export type RegistrationFormDataType = {
  name: string; // required
  dob: string; // required
  voterId: number; // required
  citizenshipNo: string; // required
  phoneNo: number; // required
  email: string; // required
  password: string; // required
  province: string;
  district: string;
  constituency: string;
  localBody: string;
  repassword: string;
  wardNo: number;
};

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    trigger,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormDataType>();

  const [registrationStatus, setRegistrationStatus] = useState<StatusType>({
    state: "processing",
    error: null,
  });
  const [formCurrentStatus, setFormCurrentStatus] = useState<
    "personal" | "location" | "security" | "verification" | "review" | null
  >("personal");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [formCurrentStatus]);

  // useed styles
  const errorTextClass = "text-sm text-red-600";

  const name = watch("name");
  const dob = watch("dob");
  const voterId = watch("voterId");
  const citizenshipNo = watch("citizenshipNo");
  const phoneNo = watch("phoneNo");
  const email = watch("email");
  const password = watch("password");
  const province = watch("province");
  const district = watch("district");
  const constituency = watch("constituency");
  const localBody = watch("localBody");
  const wardNo = watch("wardNo");

  const nextStep = async () => {
    let isValid = false;

    if (formCurrentStatus === "personal") {
      // Step 1 = personal info
      isValid = await trigger([
        "name",
        "dob",
        "voterId",
        "citizenshipNo",
        "phoneNo",
        "email",
      ]);
    } else if (formCurrentStatus === "location") {
      // Step 2 = location info
      isValid = await trigger([
        "province",
        "district",
        "constituency",
        "localBody",
      ]);
    } else if (formCurrentStatus === "security") {
      // Step 3 = security info
      isValid = await trigger(["password", "repassword"]);
    }

    if (isValid)
      setFormCurrentStatus((prev) => {
        return prev === "personal"
          ? "location"
          : prev === "location"
            ? "security"
            : prev === "security"
              ? "review"
              : "personal";
      }); // go next only if valid
  };

  function isAdult(value: string): true | string {
    const dob = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    // verifying really adult

    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= 18 || "You must be at least 18 years old.";
  }

  if (
    registrationStatus.state === "successful" ||
    registrationStatus.state === "failed"
  ) {
    return (
      <div
        className="flex flex-col items-center justify-center 
             p-6 w-full max-w-200 space-y-6 mx-auto"
      >
        <RegistrationStatus
          status={registrationStatus}
          setStatus={setRegistrationStatus}
        />
      </div>
    );
  }

  const onSubmit = async (data: RegistrationFormDataType) => {
    // call registration function here
    try {
      await registerUser(data);
      console.log("Registration successful");
      reset();
      setRegistrationStatus({ state: "successful", error: null });
    } catch (err: any) {
      console.log("Registration error", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setRegistrationStatus({ state: "failed", error: errorMessage });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center 
            bg-inherit p-6 w-full max-w-200 space-y-6 mx-auto "
    >
      <RegistrationProgressBar
        stepStatus={{
          personal:
            formCurrentStatus === "personal" ? "in-progress" : "completed",
          location:
            formCurrentStatus === "location"
              ? "in-progress"
              : formCurrentStatus === "personal"
                ? "pending"
                : "completed",
          security:
            formCurrentStatus === "security"
              ? "in-progress"
              : formCurrentStatus === "review"
                ? "completed"
                : "pending",
          review: formCurrentStatus === "review" ? "in-progress" : "pending",
        }}
      />

      {/* this is the prototype form  */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-900 rounded-xl shadow-md border
                 border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Header Section */}

        {formCurrentStatus && formCurrentStatus === "personal" && (
          <>
            {/* Header Section */}
            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight text-center">
                Personal Details
              </h2>
              <p
                className="text-slate-500 dark:text-slate-400 text-base font-normal
                                 leading-relaxed text-center mt-2 max-w-lg mx-auto"
              >
                Please provide your personal information exactly as it appears
                on your National Identity Card for identity verification.
              </p>
            </div>

            {/* Form Input Section */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Full Name */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="name"
                    className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                  >
                    *Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full legal name"
                    {...register("name", {
                      required: "Name field is required",
                      pattern: {
                        value: /^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,}$/,
                        message: `Please enter your full legal name 
                                                    (first and last name) as it appears on your
                                                     official identity documents.`,
                      },
                    })}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700
                                             bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900
                                              dark:text-white focus:border-blue-500 focus:ring-2
                                               focus:ring-blue-500/20 outline-none transition-all"
                  />
                  {errors.name && (
                    <p className={errorTextClass}>{errors.name.message}</p>
                  )}
                </div>

                {/* 2. Date of Birth */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="dob"
                    className="text-slate-700 dark:text-slate-300 
                                        text-sm font-semibold"
                  >
                    *Date of Birth
                  </label>
                  <input
                    id="dob"
                    type="date"
                    required
                    {...register("dob", {
                      required: "Date of birth field is required",
                      validate: (value) => {
                        return (
                          isAdult(value) || "You must be at least 18 years old."
                        );
                      },
                    })}
                    className="w-full rounded-lg border border-slate-200
                                             dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 
                                             text-base text-slate-900 dark:text-white focus:border-blue-500
                                              focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  {errors.dob && (
                    <p className={errorTextClass}>{errors.dob.message}</p>
                  )}
                </div>

                {/* 3. Phone Number */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phoneNo"
                    className="text-slate-700
                                         dark:text-slate-300 text-sm font-semibold"
                  >
                    *Phone Number
                  </label>
                  <input
                    id="phoneNo"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    {...register("phoneNo", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^9[678]\d{8}$/,
                        message: "Please enter a valid phone no.",
                      },
                    })}
                    className="w-full rounded-lg border border-slate-200
                                             dark:border-slate-700 bg-slate-50 dark:bg-slate-800 
                                             h-14 px-4 text-base text-slate-900 dark:text-white
                                              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  {errors.phoneNo && (
                    <p className={errorTextClass}>{errors.phoneNo.message}</p>
                  )}
                </div>

                {/* 4. Email Address */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="email"
                    className="text-slate-700
                                         dark:text-slate-300 text-sm font-semibold"
                  >
                    *Email Address
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="example@email.com"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full rounded-lg border border-slate-200
                                             dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 
                                             text-base text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2
                                              focus:ring-blue-500/20 outline-none transition-all"
                  />
                  {errors.email && (
                    <p className={errorTextClass}>{errors.email.message}</p>
                  )}
                </div>

                {/* 5. Citizenship Number */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="citizenshipNo"
                    className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                  >
                    *Citizenship Number
                  </label>
                  <input
                    required
                    id="citizenshipNo"
                    type="text"
                    placeholder="01-01-XXXXX"
                    {...register("citizenshipNo", {
                      required: "Citizenship no field is required",
                    })}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700
                                             bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900
                                              dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                              outline-none transition-all"
                  />
                  {errors.citizenshipNo && (
                    <p className={errorTextClass}>
                      {errors.citizenshipNo.message}
                    </p>
                  )}
                </div>

                {/* 6. Voter ID */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="voterId"
                    className="text-slate-700 dark:text-slate-300 
                                        text-sm font-semibold"
                  >
                    *Voter ID
                  </label>
                  <input
                    required
                    id="voterId"
                    type="number"
                    placeholder="123XXXX.."
                    {...register("voterId", {
                      required: "VoterId is required",
                    })}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  {errors.voterId && (
                    <p className={errorTextClass}>{errors.voterId.message}</p>
                  )}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 flex gap-3 items-start">
                <span className="material-symbols-outlined text-blue-500">
                  info
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ensure all personal details match your official documents. Any
                  mismatch may delay or invalidate your voter registration.
                  <br />* indicates a required field
                </p>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-end items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  nextStep();
                }}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Continue to Address
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </>
        )}

        {
          // Check if the current form step is 'location' before rendering
          formCurrentStatus && formCurrentStatus === "location" && (
            <>
              {/* Header Section: Contains the Title and Description */}
              <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight text-center">
                  Permanent Address &amp; Electoral Area
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center mt-2 max-w-lg mx-auto">
                  Please provide your geographic details as per your National
                  Identity Card to determine your voter constituency.
                </p>
              </div>

              {/* Form Input Section */}
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 1. Province Selection Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="province"
                      className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2"
                    >
                      *Province
                      {/* Info icon with tooltip */}
                      <span
                        className="material-symbols-outlined text-xs text-slate-400"
                        title="State or Province of residence"
                      >
                        info
                      </span>
                    </label>
                    <select
                      id="province"
                      className="w-full rounded-lg text-slate-900 dark:text-white border
                                             border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800
                                              h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                              outline-none transition-all appearance-none"
                      {...register("province", {
                        required: "Province is required",
                      })}
                      onChange={(e) => {
                        setValue("province", e.target.value);
                        setValue("district", "");
                        setValue("constituency", "");
                        // setValue('pollingStation', '')
                      }}
                    >
                      <option value="">Select Province</option>
                      {Object.keys(locationData).map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className={errorTextClass}>
                        {errors.province.message}
                      </p>
                    )}
                  </div>

                  {/* 2. District Selection Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="district"
                      className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                    >
                      *District
                    </label>
                    <select
                      id="district"
                      className="w-full rounded-lg text-slate-900 dark:text-white border
                                             border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 
                                             text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none 
                                             transition-all appearance-none"
                      {...register("district", {
                        required: "District is required",
                      })}
                      onChange={(e) => {
                        setValue("district", e.target.value);
                        setValue("constituency", "");
                        // setValue('pollingStation', '')
                      }}
                    >
                      <option value="">Select a district</option>
                      {province &&
                        Object.keys(locationData[province]).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                    </select>
                    {errors.district && (
                      <p className={errorTextClass}>
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  {/* 3. Local Body Selection (Full width on medium screens) */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="localBody"
                      className="text-slate-700 dark:text-slate-300 text-sm 
                                        font-semibold"
                    >
                      Local Body
                    </label>
                    <input
                      id="localBody"
                      type="text"
                      placeholder="Example Muncipality"
                      {...register("localBody")}
                      className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>

                  {/* 4. Ward Number Input (Numeric) */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="wardNo"
                      className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                    >
                      Ward No.
                    </label>
                    <input
                      id="wardNo"
                      type="number"
                      min="1"
                      max="35"
                      placeholder="e.g. 1"
                      className="w-full rounded-lg text-slate-900 dark:text-white border
                                             border-slate-200 dark:border-slate-700 bg-slate-50
                                              dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500
                                               focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      {...register("wardNo")}
                    />
                  </div>

                  {/* 5. Electoral Constituency Selection */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="constituency"
                      className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                    >
                      *Electoral Constituency
                    </label>
                    <select
                      id="constituency"
                      className="w-full rounded-lg text-slate-900 dark:text-white border 
                                            border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 
                                            text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none 
                                            transition-all appearance-none"
                      {...register("constituency", {
                        required: "Constituency is required",
                      })}
                      onChange={(e) => {
                        setValue("constituency", e.target.value);
                      }}
                    >
                      <option value="">Select Constituency</option>
                      {province &&
                        district &&
                        Object.keys(locationData[province][district]).map(
                          (c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ),
                        )}
                    </select>
                    {errors.constituency && (
                      <p className={errorTextClass}>
                        {errors.constituency.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Info Box: Helpful guidance for the user */}
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-blue-500">
                    verified_user
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Your electoral area is automatically determined based on
                    your permanent address. If the suggested area is incorrect,
                    please verify your address details against your citizenship
                    document.
                  </p>
                </div>
              </div>

              {/* Navigation Footer: Contains Back and Next/Submit buttons */}
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setFormCurrentStatus("personal");
                  }}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Back to Personal Info
                </button>

                {/* Submit/Continue Button */}
                <Button
                  type="button"
                  onClick={() => {
                    nextStep();
                  }}
                  className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  Continue to Security
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Button>
              </div>
            </>
          )
        }

        {formCurrentStatus && formCurrentStatus === "security" && (
          <>
            {/* Header Section */}
            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight text-center">
                Account Security
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center mt-2 max-w-lg mx-auto">
                Create a strong password to secure your voter account and
                protect your personal information.
              </p>
            </div>

            {/* Form Input Section */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                  >
                    *Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full rounded-lg text-slate-900 dark:text-white border
                                             border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 
                                             px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                             outline-none transition-all"
                      {...register("password", {
                        required: "New Password field is required.",
                        minLength: {
                          value: 8,
                          message: "Please type at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                          message:
                            "Password must contain atleast one uppercase, alphanumeric, and symbol.",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-gray-200"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <IoEyeOff size={20} />
                      ) : (
                        <IoEye size={20} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className={errorTextClass}>{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="repassword"
                    className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                  >
                    *Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="repassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      className="w-full rounded-lg text-slate-900 dark:text-white 
                                            border border-slate-200 dark:border-slate-700 bg-slate-50
                                            dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2
                                            focus:ring-blue-500/20 outline-none transition-all"
                      {...register("repassword", {
                        required: "Please re-confirm the new password.",
                        validate: (value) => {
                          return value === password || "Passwords donot match";
                        },
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-gray-200"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <IoEyeOff size={20} />
                      ) : (
                        <IoEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.repassword && (
                    <p className={errorTextClass}>
                      {errors.repassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 flex gap-3 items-start">
                <span className="material-symbols-outlined text-amber-500">
                  lock
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Use at least 8 characters with a mix of letters, numbers, and
                  symbols. Do not share your password with anyone.
                </p>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setFormCurrentStatus("location")}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Address
              </button>

              {/* Continue Button */}
              <Button
                type="button"
                onClick={() => {
                  nextStep();
                }}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Review Details
                <span className="material-symbols-outlined">arrow_forward</span>
              </Button>
            </div>
          </>
        )}

        {formCurrentStatus && formCurrentStatus === "review" && (
          <>
            {/* Header Section */}
            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight text-center">
                Review Registration Details
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center mt-2 max-w-lg mx-auto">
                Please verify all information. These details will be submitted
                for official voter verification.
              </p>
            </div>

            {/* Details Display Section */}
            <div className="p-8 space-y-10">
              {(() => {
                const LABEL_STYLE =
                  "text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1";
                const VALUE_STYLE =
                  "text-slate-900 dark:text-white text-base font-semibold";
                const SECTION_TITLE =
                  "text-blue-600 dark:text-blue-400 text-sm font-bold border-l-4 border-blue-600 pl-3 mb-6";

                return (
                  <div className="flex flex-col gap-10">
                    {/* 1. Identity & Personal Info */}
                    <div>
                      <h3 className={SECTION_TITLE}>Identity & Personal</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <div className="md:col-span-2">
                          <p className={LABEL_STYLE}>Full Legal Name</p>
                          <p className={VALUE_STYLE}>{name}</p>
                        </div>
                        <div>
                          <p className={LABEL_STYLE}>Date of Birth</p>
                          <p className={VALUE_STYLE}>{dob}</p>
                        </div>
                        <div>
                          <p className={LABEL_STYLE}>Citizenship Number</p>
                          <p className={VALUE_STYLE}>{citizenshipNo}</p>
                        </div>
                        <div>
                          <p className={LABEL_STYLE}>Voter ID Number</p>
                          <p className={VALUE_STYLE}>{voterId}</p>
                        </div>
                      </div>
                    </div>

                    {/* 2. Contact Information */}
                    <div>
                      <h3 className={SECTION_TITLE}>Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                          <p className={LABEL_STYLE}>Phone Number</p>
                          <p className={VALUE_STYLE}>+977 {phoneNo}</p>
                        </div>
                        <div>
                          <p className={LABEL_STYLE}>Email Address</p>
                          <p className={VALUE_STYLE}>{email}</p>
                        </div>
                      </div>
                    </div>

                    {/* 3. Address & Constituency */}
                    <div>
                      <h3 className={SECTION_TITLE}>Location Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                        <div>
                          <p className={LABEL_STYLE}>Province</p>
                          <p className={VALUE_STYLE}>{province}</p>
                        </div>
                        <div>
                          <p className={LABEL_STYLE}>District</p>
                          <p className={VALUE_STYLE}>{district}</p>
                        </div>
                        <div>
                          <p className={LABEL_STYLE}>Constituency</p>
                          <p className={VALUE_STYLE}>{constituency}</p>
                        </div>
                        <div>
                          <p className={LABEL_STYLE}>Local Body</p>
                          <p className={VALUE_STYLE}>
                            {localBody ? localBody : "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className={LABEL_STYLE}>Ward No: </p>
                          <p className={VALUE_STYLE}>
                            {wardNo ? wardNo : "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Warning Box */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 flex gap-3 items-start">
                <span className="material-symbols-outlined text-amber-500">
                  warning
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  By clicking submit, you certify that the information provided
                  is true and accurate according to your official records.
                </p>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => setFormCurrentStatus("personal")}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold hover:text-blue-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  arrow_back
                </span>
                Back to Edit
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Confirm & Submit Registration
                <span className="material-symbols-outlined">how_to_reg</span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
