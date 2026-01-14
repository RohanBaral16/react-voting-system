import type { ButtonHTMLAttributes } from 'react'
import {cn} from './utils'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: ButtonVariant
    className?: string
}
export default function Button({className, variant='primary', ...props}: ButtonProps){

const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 shadow-md',
    secondary: 'border border-gray-500 text-gray-700 hover:bg-gray-150 shadow-sm',
    danger: 'bg-red-600 text-white hover:bg-red-700' 

}

const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all focus:ring-2'

    return(
        <button className={cn(baseStyles, variants[variant], className)}
        {...props}
        />
    )
}