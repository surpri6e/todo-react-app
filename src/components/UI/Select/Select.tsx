import React, { ChangeEvent } from 'react'
import { ISelectOption } from '../../../types'
import cl from './Select.module.css'

interface SelectProps {
    options: ISelectOption[];
    change: (time: number) => void;
}

const Select: React.FC<SelectProps> = ({options, change}) => {
  return (
    <select className={cl.sel} onChange={(ev: ChangeEvent<HTMLSelectElement>) => change(parseInt(ev.target.value))}>
        {
            options.map(option =>
                <option value={option.value} key={option.value}>{option.text}</option>    
            )
        }
    </select>
  )
}

export default Select