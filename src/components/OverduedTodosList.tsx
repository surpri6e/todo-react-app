import React from 'react'
import { ITodoItem } from '../types'
import '../styles/TodosList.css'
import OverduedTodoItem from './OverduedTodoItem';

interface OverduedTodosListProps {
    todos: ITodoItem[];
}

const OverduedTodosList: React.FC<OverduedTodosListProps> = ({todos}) => {
    if(!todos.length) {
        return <h1 className={'todosListCleaned'}>Вы ничего не просрочили!</h1>
    }

    let id: number = 0;

  return (
    <>
        {
            todos.map(todo => {
                if(id !== todo.id) {
                    id = todo.id;
                    return <OverduedTodoItem currentTodo={todo} key={todo.id}/>
                }
                else {
                    return <div key={String(todo.date)}></div>;
                }
            })
        }
    </>
  )
}

export default OverduedTodosList