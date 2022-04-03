import React from 'react'
import cl from './Input.module.css'

interface InputParamsProps {
    placeholder: string;
    type: React.HTMLInputTypeAttribute;
    value?: string;
}

interface InputProps {
    change?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    params: InputParamsProps;
    maxLength?: number;
}

const Input: React.FC<InputProps> = ({change, params, maxLength}) => {
  return (
    <input
        maxLength={maxLength}
        className={cl.inp}
        onChange={change} 
        value={params.value}
        type={params.type}
        placeholder={params.placeholder}
    />
  )
}

export default Input;