import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ITodoItem } from '../types'
import TodoItem from './TodoItem';
import '../styles/TodosList.css'

interface TodosListUpdateProps {
    todos: ITodoItem[];
    setTodos: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}

interface TodosListProps {
    todos: ITodoItem[];
    deleteTodo: (todo: ITodoItem) => void;
    update: TodosListUpdateProps;
}

const TodosList: React.FC<TodosListProps> = ({todos, deleteTodo, update}) => {
    if(!todos.length) {
        return <h1 className={'todosListCleaned'}>Похоже вы ничем не заняты :(</h1>
    }

  return (
    <TransitionGroup>
        {
            todos.map((todo, ind) => 
                <CSSTransition classNames={'todos'} timeout={500} key={todo.id}>
                    <TodoItem 
                        currentTodo={todo} 
                        ind={ind} 
                        deleteTodo={deleteTodo}
                        update={update}
                    />
                </CSSTransition>    
            )
        }
    </TransitionGroup>
  )
}

export default TodosList