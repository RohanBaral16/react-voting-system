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

    const {user, login, error:contextError} = useContext(AuthContext)
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const errorTextClass = "text-sm text-red-600"

    useEffect(()=>{
        if(contextError){
            setError(contextError)
        }
    }, [contextError])

    useEffect(()=>{
        // Clear error when visiting login page
        if(error != 'Not authenticated'){
            setError(null)
        }
    }, [])

    const onSubmit = async(data: FormDataType): Promise<void> =>{
        // logic for login, and navigate to dashboard
        try{
          console.log('form data:', data)
          await login(data.email, data.password)
          reset()
        }catch(err: any){
          setError(err.message || 'Login Error. Please try again')
        }
        
    }
    // if already logged in take to dashboard
    useEffect(()=>{
        if(user){
      navigate('/dashboard')
        }
    },[user, navigate])
    return(
            <div className="grow flex items-center justify-center 
            bg-[#fffffA]"
             >
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-125 bg-white border border-gray-200 rounded-xl p-8 shadow-lg space-y-6 mt-2"
                >

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-center text-gray-800">
                    E-Voting Login
                    </h2>

                        <div className="space-y-1 flex flex-col ">
                            <label htmlFor="email">Email</label>
                            <Input 
                                placeholder="your-email@evoting.org.np"
                                variant="long"
                                {...register('email', {required: 'Please enter your Email'})}
                            />
                            {
                                errors.email &&
                                (
                                    <p className={errorTextClass}>
                                    {errors.email.message}  
                                    </p>
                                )
                            }
                        </div>

                        

                    <div className="space-y-1 flex flex-col">
                        <label htmlFor="password">New Password</label>
                        <div className="relative">
                            <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            variant="long"
                            placeholder="*********"
                            className="pr-10"
                            {...register(
                                'password',
                                {
                                    required: 'Please enter your password'}
                            )}
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
                        {
                            errors.password &&
                            (
                                <p className={errorTextClass}>
                                  {errors.password.message}  
                                </p>
                            )
                        }
                    </div>

                    <div className='flex justify-between text-blue-700'>
                        <Link className='cursor-pointer visited:text-blue-950' to='/forgotpassword'>Forgot Password?</Link>
                        <Link className='cursor-pointer  visited:text-blue-950' to='/register'>Voter Registration</Link>
                    </div>

                    {
                      error && <p className={errorTextClass}>{error}</p>
                    }

                     {/*submit button  */}

                     <div className="flex flex-row justify-center">
                        <Button type='submit' variant='primary' 
                        className="px-10">Login</Button>
                     </div>
                    
                </form>
                
            </div>
    )
}