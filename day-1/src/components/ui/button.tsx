import type { ButtonHTMLAttributes } from 'react'
import {cn} from './utils'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: ButtonVariant
    className?: string
}
export default function Button({className, variant='primary', ...props}: ButtonProps){

const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700  hover:ring-blue-200 focus:ring-blue-300 shadow-md',
    secondary: `
            bg-[#FFFFFE] dark:bg-slate-700  border  hover:bg-[#ffffe4] dark:hover:bg-slate-600 hover:ring-blue-200 
            focus:ring-blue-300 border-gray-500 dark:border-none text-gray-700 dark:text-white hover:bg-gray-150 
            shadow-sm    
    `,
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:ring-blue-200 focus:ring-blue-300' 

}

const baseStyles = `
px-4 py-2 rounded-xl 
font-medium transition-all 
focus:ring-2 
hover:ring-1
cursor-pointer
hover:scale-105
`

    return(
        <button className={cn(baseStyles, variants[variant], className)}
        {...props}
        />
    )
}