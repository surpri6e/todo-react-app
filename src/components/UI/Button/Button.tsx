import React from 'react'
import cl from './Button.module.css'

interface ButtonProps {
    click?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({click, children, disabled}) => {
  return (
    <button onClick={click} className={cl.btn} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button