import React from 'react'
import { ITodoItem } from '../types'
import '../styles/OverduedTodoItem.css'

interface OverduedTodoItemProps {
    currentTodo: ITodoItem;
}

const OverduedTodoItem: React.FC<OverduedTodoItemProps> = ({currentTodo}) => {
  return (
    <div className={'overduedTodoItem'}>
        <div className={'overduedTodoItemBody'}>{currentTodo.text}</div>
        <div className={'overduedTodoItemTime'}>
            {currentTodo.time} min.
        </div>
    </div>
  )
}

export default OverduedTodoItem