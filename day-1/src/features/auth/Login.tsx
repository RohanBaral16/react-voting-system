import { useForm } from 'react-hook-form'
import Button from '../../components/ui/button'
import { useContext, useEffect, useState} from 'react'
import Input from '../../components/ui/input'
import { AuthContext } from '../../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { IoEye, IoEyeOff } from 'react-icons/io5'

type FormDataType = {
  email: string
  password: string
}

export default function Login(){
    const {register, handleSubmit, reset, formState:{errors}} = useForm<FormDataType>()
    const {login, error:contextError} = useContext(AuthContext)
    const navigate = useNavigate()
    const [localError, setLocalError] = useState<string|null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const errorTextClass = "text-sm text-red-600"

    useEffect(()=>{ if(contextError){ setLocalError(contextError) } }, [contextError])

    const onSubmit = async(data: FormDataType): Promise<void> =>{
        setLocalError(null)
        try{
          console.log('form data:', data)
          await login(data.email, data.password)
          navigate('/dashboard', { replace: true });
        }catch(err: any){
          setLocalError(err.message || 'Login Error. Please try again')
        }
    }
    

    return(
        <div className="flex flex-col items-center justify-center 
            bg-inherit p-6 w-full max-w-200 space-y-6 mx-auto">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8 space-y-6"
            >
                {/* Title */}
                <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        E-Voting Login
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base mt-2 max-w-lg mx-auto">
                        Enter your registered email and password to continue.
                    </p>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                        Email
                    </label>
                    <Input 
                        placeholder="your-email@evoting.org.np"
                        variant="long"
                        {...register('email', {required: 'Please enter your Email'})}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700
                                   bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white
                                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                    {errors.email && <p className={errorTextClass}>{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            variant="long"
                            placeholder="*********"
                            className="w-full pr-10 rounded-lg border border-slate-200 dark:border-slate-700
                                       bg-slate-50 dark:bg-slate-800 h-14 px-4 text-base text-slate-900 dark:text-white
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            {...register('password', {required: 'Please enter your password'})}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className={errorTextClass}>{errors.password.message}</p>}
                </div>

                {/* Links */}
                <div className="flex justify-between text-md text-blue-700 dark:text-blue-300">
                    <Link className="cursor-pointer font-medium hover:underline" to='/forgotpassword'>
                        Forgot Password?
                    </Link>
                    <Link className="cursor-pointer font-medium hover:underline" to='/register'>
                        Voter Registration
                    </Link>
                </div>

                {/* Error Message */}
                {localError && <p className={errorTextClass}>{localError}</p>}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button type='submit' variant='primary' className="px-10 w-full sm:w-auto">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}
