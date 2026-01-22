
import { useForm } from "react-hook-form"
import Button from "../../components/ui/button"
import Input from "../../components/ui/input"
import { locationData } from "../../demoData"
import RegistrationStatus, { type StatusType } from "../../components/ui/RegistrationStatus"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../api/authFetch"
import RegistrationProgressBar from "../../components/ui/RegistrationProgressBar"

type FormDataType = {
    name: string, // required
    dob: string, // required
    voterId: number, // required
    citizenshipNo: string, // required
    phoneNo: number,   // required
    email:string,// required
    password: string,// required
    province: string;
    district: string;
    constituency: string;
    repassword: string

}


export default function RegisterPrototype(){
    const {register, watch, handleSubmit, setValue, reset, formState:{errors}} = useForm<FormDataType>()

    const {user} = useContext(AuthContext)

    const navigate = useNavigate()

    const [registrationStatus, setRegistrationStatus] = useState<StatusType>('processing')
    const[formCurrentStatus, setFormCurrentStatus] = useState<'personal'|'location'|'security'|'verification'|'review'|null>('personal')
    const password = watch('password')
    const province = watch("province");
    const district = watch("district");
    const constituency = watch("constituency");
    
    const selectClass = "space-y-1 w-full flex flex-col border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    const errorTextClass = "text-sm text-red-600"

    function isAdult(value: string): true | string{
        const dob = new Date(value)
        const today = new Date()
        let age = today.getFullYear() - dob.getFullYear()

        // verifying really adult

        const monthDiff = today.getMonth() - dob.getMonth()
        const dayDiff = today.getDate() - dob.getDate()

        if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){
            age--
        }

        return age >= 18 || 'You must be at least 18 years old.'

    }
    if(user){
        navigate('/dashboard')
    }

    if(registrationStatus === 'successful' || registrationStatus === 'failed'){
        return(<RegistrationStatus status={registrationStatus} setStatus={setRegistrationStatus}/>)
    }

    const onSubmit = async(data: FormDataType) => {
        // call registration function here
        const {repassword, ...userData} = data
        console.log('Registration data', userData)
        // try{
        //      await registerUser(userData)
        //      reset()
        //      setRegistrationStatus('successful')
        // }catch(err){
        //     console.log('Registration error', err)
        //     setRegistrationStatus('failed')
            
        // }
   
  }

    return(
            <div className="flex flex-col items-center justify-center 
            bg-inherit p-6 w-full max-w-200 space-y-6 mx-auto ">

                <RegistrationProgressBar
                    stepStatus={{
                        personal: 'completed',
                        location: 'completed',
                        security: 'completed',
                    }}
                    />


                

                {/* this is the prototype form  */}


                <form className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* Header Section */}
                
                {
                    formCurrentStatus && formCurrentStatus === 'personal' && (
                        <>
                            {/* Header Section */}
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight text-center">
                                    Personal Details
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center mt-2 max-w-lg mx-auto">
                                    Please provide your personal information exactly as it appears on your National Identity Card for identity verification.
                                </p>
                            </div>

                            {/* Form Input Section */}
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* 1. Full Name */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label htmlFor="name" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full legal name"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    {/* 2. Date of Birth */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="dob" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                            Date of Birth
                                        </label>
                                        <input
                                            id="dob"
                                            type="date"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    {/* 3. Phone Number */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="phoneNo" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phoneNo"
                                            type="tel"
                                            placeholder="98XXXXXXXX"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    {/* 4. Email Address */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="example@email.com"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    {/* 5. Citizenship Number */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="citizenshipNo" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                            Citizenship Number
                                        </label>
                                        <input
                                            required
                                            id="citizenshipNo"
                                            type="text"
                                            placeholder="As per citizenship certificate"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    {/* 6. Voter ID */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="voterId" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                            Voter ID
                                        </label>
                                        <input
                                            required
                                            id="voterId"
                                            type="number"
                                            placeholder="123XXXX.."
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 flex gap-3 items-start">
                                    <span className="material-symbols-outlined text-blue-500">
                                        info
                                    </span>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Ensure all personal details match your official documents. Any mismatch may delay or invalidate your voter registration.
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Footer */}
                            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-end items-center gap-4">

                                <button
                                    type="button"
                                    onClick={()=>{setFormCurrentStatus('location')}}
                                    className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                                >
                                    Continue to Address
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </>
                    )
                }


                { 
                    // Check if the current form step is 'location' before rendering
                    formCurrentStatus && formCurrentStatus === 'location' && (
                        <>
                            {/* Header Section: Contains the Title and Description */}
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight text-center">
                                    Permanent Address &amp; Electoral Area
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center mt-2 max-w-lg mx-auto">
                                    Please provide your geographic details as per your National Identity Card to determine your voter constituency.
                                </p>
                            </div>

                            {/* Form Input Section */}
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* 1. Province Selection Dropdown */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="province" className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                                            Province
                                            {/* Info icon with tooltip */}
                                            <span className="material-symbols-outlined text-xs text-slate-400" title="State or Province of residence">info</span>
                                        </label>
                                        <select 
                                            id="province"
                                            className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
                                        >
                                            <option disabled value="">Select Province</option>
                                            <option value="1">Koshi Province</option>
                                            <option value="2">Madhesh Province</option>
                                            <option value="3">Bagmati Province</option>
                                            <option value="4">Gandaki Province</option>
                                            <option value="5">Lumbini Province</option>
                                            <option value="6">Karnali Province</option>
                                            <option value="7">Sudurpashchim Province</option>
                                        </select>
                                    </div>

                                    {/* 2. District Selection Dropdown */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="district" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">District</label>
                                        <select 
                                            id="district"
                                            className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
                                        >
                                            <option disabled value="">Select District</option>
                                            <option value="kathmandu">Kathmandu</option>
                                            <option value="lalitpur">Lalitpur</option>
                                            <option value="bhaktapur">Bhaktapur</option>
                                        </select>
                                    </div>

                                    {/* 3. Local Body Selection (Full width on medium screens) */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label htmlFor="localBody" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Municipality / Rural Municipality</label>
                                        <select 
                                            id="localBody"
                                            className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
                                        >
                                            <option disabled value="">Select Local Body</option>
                                            <option value="ktm-metro">Kathmandu Metropolitan City</option>
                                            <option value="pokhara-metro">Pokhara Metropolitan City</option>
                                        </select>
                                    </div>

                                    {/* 4. Ward Number Input (Numeric) */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="wardNo" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Ward No.</label>
                                        <input 
                                            id="wardNo"
                                            type="number"
                                            min="1"
                                            max="35"
                                            placeholder="e.g. 1"
                                            className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    {/* 5. Electoral Constituency Selection */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="constituency" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Electoral Constituency</label>
                                        <select 
                                            id="constituency"
                                            className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
                                        >
                                            <option disabled value="">Select Area</option>
                                            <option value="1">Area 1</option>
                                            <option value="2">Area 2</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Info Box: Helpful guidance for the user */}
                                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 flex gap-3 items-start">
                                    <span className="material-symbols-outlined text-blue-500">verified_user</span>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Your electoral area is automatically determined based on your permanent address. If the suggested area is incorrect, please verify your address details against your citizenship document.
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Footer: Contains Back and Next/Submit buttons */}
                            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                                {/* Back Button */}
                                <button 
                                    type="button"
                                    onClick={()=>{setFormCurrentStatus('personal')}}
                                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
                                >
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Back to Personal Info
                                </button>
                                
                                {/* Submit/Continue Button */}
                                <Button 
                                    type="button"
                                    onClick={()=>{setFormCurrentStatus('security')}}
                                    className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                                >
                                    Continue to Security
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Button>
                            </div>
                        </>
                    )
                }

                {
                    formCurrentStatus && formCurrentStatus === 'security' && (
                        <>
                            {/* Header Section */}
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight text-center">
                                    Account Security
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center mt-2 max-w-lg mx-auto">
                                    Create a strong password to secure your voter account and protect your personal information.
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
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter password"
                                            className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="repassword"
                                            className="text-slate-700 dark:text-slate-300 text-sm font-semibold"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            id="repassword"
                                            type="password"
                                            placeholder="Re-enter password"
                                            className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 flex gap-3 items-start">
                                    <span className="material-symbols-outlined text-amber-500">lock</span>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Use at least 8 characters with a mix of letters, numbers, and symbols.
                                        Do not share your password with anyone.
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Footer */}
                            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                                
                                {/* Back Button */}
                                <button
                                    type="button"
                                    onClick={() => setFormCurrentStatus('location')}
                                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
                                >
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Back to Address
                                </button>

                                {/* Continue Button */}
                                <Button
                                    type="button"
                                    onClick={() => setFormCurrentStatus('review')}
                                    className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                                >
                                    Review Details
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Button>
                            </div>
                        </>
                    )
                }


            </form>  
        </div>
    )
}