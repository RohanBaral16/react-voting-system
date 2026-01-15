import type { InputHTMLAttributes } from "react";
import {cn} from './utils'

type InputVariant = 'short' | 'long'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    variant?: InputVariant
    className?: string
}

export default function Input({className, variant='short', type='text', ...props}: InputProps){

    const variants={
        short: 'w-1/2',
        long: 'w-full'
    }

    const baseStyles = 'border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
    return(
        <input 
            type={type}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        />
    )
}