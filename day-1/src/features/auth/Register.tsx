
import { useForm } from "react-hook-form"
import Button from "../../components/ui/button"
import Input from "../../components/ui/input"
import { locationData } from "../../demoData"
import RegistrationStatus, { type StatusType } from "../../components/ui/RegistrationStatus"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"

type FormDataType = {
    name: string,
    dob: string, 
    voterId: number,
    citizenshipNo: string,
    fatherName: string,
    phoneNo: number,
    password: string,
    province: string;
    district: string;
    constituency: string;
    pollingStation: string;
    repassword: string

}


export default function Register(){
    const {register, watch, handleSubmit, setValue, reset, formState:{errors}} = useForm<FormDataType>()

    const {user} = useContext(AuthContext)

    const navigate = useNavigate()

    const [registrationStatus, setRegistrationStatus] = useState<StatusType>('processing')
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

    const onSubmit = (data: FormDataType) => {
    console.log('form data:', data)
    setRegistrationStatus('successful')
    reset()
  }

    return(
            <div className="grow flex items-center justify-center 
            bg-[#78CDD7] p-6">
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-125 lg:max-w-full bg-white
                    border border-gray-200 rounded-xl p-8
                    shadow-lg space-y-6 my-5
                    "
                    
                >

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Register for Voting
                    </h2>

                    <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-4 items-center">
                        <div className="space-y-1 flex flex-col">
                            <label htmlFor="name">Name</label>
                            <Input
                            id="name"
                            variant="long"
                            placeholder="Ram Prasad Pariyar"
                            {...register('name', {required: 'Name field is required'})}
                            />
                            {
                                errors.name &&
                                (
                                    <p className={errorTextClass}>
                                    {errors.name.message}  
                                    </p>
                                )
                            }
                        </div>
                        <div className="space-y-1 flex flex-col">
                            <label htmlFor="fatherName">Father's Name</label>
                            <Input
                            id="fatherName"
                            variant="long"
                            placeholder="Shyam Prasad Pariyar"
                            {...register('fatherName', {required: 'Father Name field is required'})}
                            />
                            {
                                errors.fatherName &&
                                (
                                    <p className={errorTextClass}>
                                    {errors.fatherName.message}  
                                    </p>
                                )
                            }
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <label htmlFor="ctznNo">Citizenship Number</label>
                            <Input
                            id="ctznNo"
                            variant="long"
                            placeholder="46-03-74-XXXXX"
                            {...register('citizenshipNo', {required: 'Citizenship No. field is required'})}
                            />
                            {
                                errors.fatherName &&
                                (
                                    <p className={errorTextClass}>
                                    {errors.fatherName.message}  
                                    </p>
                                )
                            }
                        </div>

                        <div className="flex w-full flex-row justify-between items-center gap-4">
                            <div className="w-1/2 flex flex-col ">
                                <label htmlFor="voterId">Voter ID</label>
                                <Input 
                                    placeholder="12345XXXX"
                                    variant="long"
                                    {...register('voterId', {required: 'VoterId is required'})}
                                />
                                {
                                    errors.voterId &&
                                    (
                                        <p className={errorTextClass}>
                                        {errors.voterId.message}  
                                        </p>
                                    )
                                }
                            </div>

                            <div className="w-1/2 flex flex-col">
                                <label htmlFor="dob">Date of Birth</label>
                                <Input 
                                    variant="long"
                                    type="date"
                                    {...register('dob', {
                                        valueAsDate: true, 
                                        required: 'Date of birth is required',
                                        validate:(value)=>(isAdult(value))
                                    })}
                                />
                                {
                                    errors.dob &&
                                    (
                                        <p className={errorTextClass}>
                                        {errors.dob.message}  
                                        </p>
                                    )
                                }
                            </div>
                            
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <label htmlFor="phoneNo">Phone Number</label>
                            <Input
                            id="phoneNo"
                            variant="long"
                            placeholder="98XXXXXXXXXX"
                            {...register('phoneNo', 
                                {required: 'Phone Number field is required',
                                    minLength:{
                                        value: 10,
                                        message: 'Please enter valid number.'
                                    }
                                })}
                            />
                            {
                                errors.phoneNo &&
                                (
                                    <p className={errorTextClass}>
                                    {errors.phoneNo.message}
                                    </p>
                                )
                            }
                        </div>


                        <div className="flex flex-row justify-between w-full gap-3">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="selectedProvince">Province</label>
                                <div className={selectClass}>
                                    <select
                                        id="selectedProvince"
                                        {...register('province', {required: 'Province is required'})}
                                        onChange={(e)=>{
                                        setValue('province', e.target.value)
                                        setValue('district', '')
                                        setValue('constituency', '')
                                        setValue('pollingStation', '')
                                        }}   
                                    >
                                        <option value=''>Select Province</option>
                                        {
                                            Object.keys(locationData).map((p)=>(
                                                <option key={p} value={p}>{p}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.province &&
                                        (
                                            <p className={errorTextClass}>
                                            {errors.province.message}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="selectedDistrict">District</label>
                                <div className={selectClass}>
                                        <select
                                            id="selectedDistrict"
                                            {...register('district', {required: 'District is required'})}
                                            onChange={(e)=>{
                                                setValue('district', e.target.value)
                                                setValue('constituency', '')
                                                setValue('pollingStation', '')
                                            }}
                                        >
                                            <option value=''>Select a district</option>
                                            {
                                                province &&
                                                Object.keys(locationData[province]).map((d)=>(
                                                    <option key={d} value={d}>{d}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            errors.district &&
                                            (
                                                <p className={errorTextClass}>
                                                {errors.district.message}
                                                </p>
                                            )
                                        }
                                </div>
                            </div>
                        </div>

                        {/* next line */}


                        <div className="flex flex-row justify-between w-full gap-3">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="selectedConstituency">Constituency</label>
                                <div className={selectClass}>
                                    <select
                                        id="selectedConstituency"
                                        {...register('constituency', {required: 'Constituency is required'})}
                                        onChange={(e)=>{
                                        setValue('constituency', e.target.value)
                                        setValue('pollingStation', '')
                                        }}   
                                    >
                                        <option value=''>Select Constituency</option>
                                        { province && district && 
                                            Object.keys(locationData[province][district]).map((c)=>(
                                                <option key={c} value={c}>{c}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.constituency &&
                                        (
                                            <p className={errorTextClass}>
                                            {errors.constituency.message}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="selectedStation">Polling Station</label>
                                <div className={selectClass}>
                                        <select
                                            id="selectedStation"
                                            {...register('pollingStation', {required: 'Polling station is required'})}
                                        >
                                            <option value=''>Select a Polling Station</option>
                                            {
                                            province && district && constituency &&
                                            locationData[province][district][constituency].map((station)=>(
                                                <option key={station} value={station}>{station}</option>
                                            ))
                                            }
                                        </select>
                                        {
                                        errors.pollingStation &&
                                        (
                                            <p className={errorTextClass}>
                                            {errors.pollingStation.message}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>    
                        <div className="hidden lg:block"></div>


                        <div className="space-y-1 flex flex-col">
                            <label htmlFor="password">New Password</label>
                            <Input
                            type="password"
                            id="password"
                            variant="long"
                            placeholder="*********"
                            {...register(
                                'password',
                                {
                                    required: 'New Password field is required.',
                                    minLength:{
                                        value: 8,
                                        message: 'Please type at least 8 characters',
                                    },
                                    pattern:{
                                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                                        message: 'Password must contain atleast one uppercase, alphanumeric, and symbol.'
                                    }
                                }
                            )}
                            />
                            {
                                errors.password &&
                                (
                                    <p className={errorTextClass}>
                                    {errors.password.message}  
                                    </p>
                                )
                            }
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <label htmlFor="repassword">Confirm Password</label>
                            <Input
                            type="password"
                            id="repassword"
                            variant="long"
                            placeholder="*********"
                            {...register(
                                'repassword',
                                {
                                    required: 'Please re-confirm the new password.',
                                    validate:(value)=>{
                                        return value === password || 'Passwords donot match'
                                    }
                                },
                                
                            )}
                            />
                            {
                                errors.repassword &&
                                (
                                    <p className={errorTextClass}>
                                    {errors.repassword.message}  
                                    </p>
                                )
                            }
                        </div>
                    </div>
                     {/*submit button  */}

                     <div className="flex flex-row justify-center">
                        <Button type='submit' variant='primary' 
                        className="px-10">Register</Button>
                     </div>
                    
                </form>
                
            </div>
    )
}