import React from 'react'
import '../styles/TodoItem.css'
import { ITodoItem } from '../types'

interface TodoItemUpdateProps {
  todos: ITodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}

interface TodoItemProps {
  currentTodo: ITodoItem;
  ind: number;
  deleteTodo: (todo: ITodoItem, flag?: boolean) => void;
  update: TodoItemUpdateProps;
}

const TodoItem: React.FC<TodoItemProps> = ({currentTodo, ind, deleteTodo, update}) => {
  const [isCompleted, setIsCompleted] = React.useState<boolean>(currentTodo.completed);

  React.useEffect(() => {
    currentTodo.completed = isCompleted;
    localStorage.setItem('todos', JSON.stringify(update.todos));
  }, [isCompleted, currentTodo, update.todos])

  React.useEffect(() => {
    const getFullDate = (d: Date): string[] => {
      const date = new Date(d)
      return [`${date.getDate()}`, `${date.getHours()}`, `${date.getMinutes()}`, `${date.getSeconds()}`];
    }

    if(currentTodo.time === 0) {
      return;
    }

    const date = getFullDate(currentTodo.date);

    const nextDate = (d: string[], t: number): string[] => {
      const result: string[] = [...d];
      result[2] = String(parseInt(result[2]) + t);

      if(parseInt(result[2]) >= 60) {
        const hours: number = Math.floor(parseInt(result[2]) / 60);
        result[1] = String(parseInt(result[1]) + hours);
        result[2] = String(parseInt(result[2]) - 60 * hours);
      }

      if(parseInt(result[1]) >= 24) {
        const days: number = Math.floor(parseInt(result[1]) / 24);
        result[0] = String(parseInt(result[0]) + days);
        result[1] = String(parseInt(result[1]) - 24 * days);
      }

      if(parseInt(result[0]) >= 29) {
        const months: number = Math.floor(parseInt(result[0]) / 29);
        result[0] = String(parseInt(result[0]) - 29 * months - 1);
      }

      return result;
    }    
    
    const chekerDate = (d: string[]) => {
      const now = getFullDate(new Date());

      if(parseInt(now[0]) > parseInt(d[0])) {
        return deleteTodo(currentTodo, true);
      } else if(parseInt(now[0]) === parseInt(d[0])) {
        if(parseInt(now[1]) > parseInt(d[1])) {
          return deleteTodo(currentTodo, true);
        } else if(parseInt(now[1]) === parseInt(d[1])) {
          if(parseInt(now[2]) > parseInt(d[2])) {
            return deleteTodo(currentTodo, true);
          } else if(parseInt(now[2]) === parseInt(d[2])) {
            if(parseInt(now[3]) > parseInt(d[3])) {
              return deleteTodo(currentTodo, true);
            } else if(parseInt(now[3]) === parseInt(d[3])) {
              return deleteTodo(currentTodo, true);
            } else {
              return;
            }
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        return;
      }
    }

    chekerDate(nextDate(date, currentTodo.time));

    const overdueTodo = setInterval(() => {
      chekerDate(nextDate(date, currentTodo.time));
    }, 500)

    return () => {
      clearInterval(overdueTodo);
    }
  }, [currentTodo, deleteTodo])

  return (
    <div className={'todoItem'}>
      <div className="todoItemCompleted">
        {
          !isCompleted
            ?
            <span 
              onDoubleClick={() => {
                if(window.confirm('Have you done it?')) {
                  deleteTodo(currentTodo);
                }
              }}
              onClick={() => setIsCompleted((prev) => !prev)}
            ></span>
            :
            <span data-todo-completed 
              onDoubleClick={() => {
                if(window.confirm('Have you done it?')) {
                  deleteTodo(currentTodo);
                }
              }}
              onClick={() => setIsCompleted((prev) => !prev)}
            ></span>
        }
      </div>
      <div className="todoItemBody">
        {
          !isCompleted
          ?
          <>
            <span>{ind + 1}.</span> {currentTodo.text}
          </>
          :
          <>
            <span>{ind + 1}.</span> <s>{currentTodo.text}</s>
          </>
        }
      </div>
      <div className="todoItemTime">
        {currentTodo.time ? `${currentTodo.time} min.` : 'Always'}
      </div>
    </div>
  )
}

export default TodoItem