import { useForm } from 'react-hook-form'
import Button from '../../components/ui/button'

type FormDataType = {
  id: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>()

  const inputClass =
    "w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

  const onSubmit = (data: FormDataType) => {
    console.log('form data:', data)
    reset()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#090979] to-[#00D4FF]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[500px] bg-white border border-gray-200 rounded-xl p-8 shadow-lg space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        {/* Voter ID */}
        <div className="space-y-1">
          <label htmlFor="id" className="text-sm font-medium text-gray-700">
            Voter ID
          </label>
          <input
            id="id"
            type="text"
            placeholder="Enter your voter ID"
            className={inputClass}
            {...register('id', { required: 'User ID is required' })}
          />
          {errors.id && (
            <p className="text-sm text-red-600">
              {errors.id.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className={inputClass}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        
        <Button type='submit' variant='primary'>Login</Button>
      </form>
    </div>
  )
}
