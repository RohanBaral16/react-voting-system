import { useForm } from "react-hook-form";
import Button from "../../components/ui/button";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import RegistrationProgressBar from "../../components/ui/RegistrationProgressBar";

type FormDataType = {
  name: string;
  dob: string;
  voterId: number;
  citizenshipNo: string;
  phoneNo: number;
  email: string;
  password: string;
  province: string;
  district: string;
  constituency: string;
  repassword: string;
};

const STEP_FIELDS = {
  personal: ["name", "dob", "voterId", "citizenshipNo", "phoneNo", "email"] as const,
  location: ["province", "district", "constituency"] as const,
  security: ["password", "repassword"] as const,
};

export default function RegisterPrototype() {
  const { register, watch, handleSubmit, trigger, formState: { errors } } = useForm<FormDataType>();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formCurrentStatus, setFormCurrentStatus] = useState<'personal' | 'location' | 'security' | 'review'>('personal');

  if (user) navigate('/dashboard');

  const watchedValues = watch();

  // Logic to determine status of each step for the Progress Bar
  const getStatus = (step: 'personal' | 'location' | 'security' | 'review') => {
    const order = ['personal', 'location', 'security', 'review'];
    const currentIndex = order.indexOf(formCurrentStatus);
    const stepIndex = order.indexOf(step);

    if (currentIndex > stepIndex) return "completed";
    if (currentIndex === stepIndex) return "current";
    return "pending";
  };

  const stepStatus = {
    personal: getStatus('personal'),
    location: getStatus('location'),
    security: getStatus('security'),
    review: getStatus('review'),
  };

  // Progress percentage based on current step
  const progressMap = { personal: 25, location: 50, security: 75, review: 100 };
  const progressPercent = progressMap[formCurrentStatus];

  // Navigation Handlers
  const handleNext = async (currentStep: keyof typeof STEP_FIELDS, nextStep: typeof formCurrentStatus) => {
    const isStepValid = await trigger(STEP_FIELDS[currentStep]);
    if (isStepValid) setFormCurrentStatus(nextStep);
  };

  const onSubmit = (data: FormDataType) => {
    const { repassword, ...userData } = data;
    console.log("Final registration data:", userData);
    // Add your API call here
  };

  return (
    <div className="flex flex-col items-center justify-center bg-inherit p-6 w-full max-w-2xl space-y-6 mx-auto">
      <RegistrationProgressBar progress={progressPercent} stepStatus={stepStatus} />

      <form 
        className="w-full bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden" 
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* PERSONAL DETAILS */}
        {formCurrentStatus === "personal" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold text-center">Personal Details</h2>
            </div>
            <div className="p-8 space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium">Full Name</label>
                <input {...register("name", { required: "Name is required" })} className="p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" placeholder="John Doe" />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <input type="date" {...register("dob", { required: "Required" })} className="p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" {...register("phoneNo", { required: "Required" })} className="p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" placeholder="98XXXXXXXX" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" {...register("email", { required: "Required" })} className="p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" placeholder="email@example.com" />
              </div>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
              <Button type="button" onClick={() => handleNext('personal', 'location')}>Continue to Address</Button>
            </div>
          </div>
        )}

        {/* LOCATION */}
        {formCurrentStatus === "location" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold text-center">Address Details</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Province</label>
                  <select {...register("province", { required: "Required" })} className="p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700">
                    <option value="">Select Province</option>
                    <option value="Bagmati">Bagmati Province</option>
                    <option value="Gandaki">Gandaki Province</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">District</label>
                  <input {...register("district", { required: "Required" })} className="p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" placeholder="Kathmandu" />
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex justify-between">
              <Button type="button" onClick={() => setFormCurrentStatus("personal")}>Back</Button>
              <Button type="button" onClick={() => handleNext('location', 'security')}>Continue to Security</Button>
            </div>
          </div>
        )}

        {/* SECURITY */}
        {formCurrentStatus === "security" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold text-center">Security</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Password</label>
                <input type="password" {...register("password", { required: "Required", minLength: 8 })} className="p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <input type="password" {...register("repassword", { validate: val => val === watchedValues.password || "Passwords match error" })} className="p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" />
              </div>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex justify-between">
              <Button type="button"  onClick={() => setFormCurrentStatus("location")}>Back</Button>
              <Button type="button" onClick={() => handleNext('security', 'review')}>Review Details</Button>
            </div>
          </div>
        )}

        {/* REVIEW */}
        {formCurrentStatus === "review" && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 text-center">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold">Review Your Application</h2>
              <p className="text-slate-500 text-sm">Please verify your details before submitting.</p>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-400 mb-1">Full Name</p>
                <p className="font-semibold">{watchedValues.name}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-400 mb-1">Email</p>
                <p className="font-semibold">{watchedValues.email}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-400 mb-1">Location</p>
                <p className="font-semibold">{watchedValues.district}, {watchedValues.province}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-400 mb-1">Voter ID</p>
                <p className="font-semibold">{watchedValues.voterId}</p>
              </div>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex justify-between">
              <Button type="button"  onClick={() => setFormCurrentStatus("security")}>Back</Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Submit Registration</Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}