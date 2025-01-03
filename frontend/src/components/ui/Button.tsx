import { ReactElement } from "react"

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger',
  size: 'sm' | 'md' | 'lg',
  text: string,
  type?: any
  startIcon?: ReactElement,
  onClick?: ()=> void
}

const variantStyles: any = {
  primary: "px-5 py-2 text-white bg-main-dark",
  danger: "px-5 py-2 text-white bg-red-500 hover:bg-red-600",
  secondary: "px-5 py-2 text-main-dark bg-main-light"
}

const sizeStyles: any = {
    sm: "px-3 py-2",
    md: "px-3 py-3",
    lg: "py-4 px-6 text-lg"
}

const defaultStyle: string = "rounded-md flex gap-2 items-center"

const Button = ({variant, size, startIcon ,onClick, text, type}: ButtonProps) => {
  return (
  <button type = {type} className= {`${variantStyles[variant]} ${defaultStyle} ${sizeStyles[size]}`}  onClick={onClick}> {startIcon} {text}
  </button>
  )
}

export default Button