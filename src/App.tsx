import React from 'react'
import './styles/Null.css'
import './styles/App.css'
import Button from './components/UI/Button/Button'
import { ITodoItem } from './types'
import Modal from './components/UI/Modal/Modal'
import TodosList from './components/TodosList'
import OverduedTodosList from './components/OverduedTodosList'
import TodoCreateForm from './components/TodoCreateForm'

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [isOverduedTodos, setIsOverduedTodos] = React.useState<boolean>(false);
  const [todos, setTodos] = React.useState<ITodoItem[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
  const [overduedTodos, setOverduedTodos] = React.useState<ITodoItem[]>(JSON.parse(localStorage.getItem('overduedTodos') || '[]'));

  
  React.useEffect(() => {
    localStorage.setItem('overduedTodos', JSON.stringify(overduedTodos));
  }, [overduedTodos])

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])


  const deleteTodo = (todo: ITodoItem, flag: boolean = false): void => {
    if(flag) {
      setOverduedTodos(() => {
        return [...overduedTodos, todo]
      });
    }
    setTodos(() => {
      return todos.filter(t => todo.id !== t.id)
    });
  }

  const createTodo = (todo: ITodoItem): void => {
    setTodos([...todos, todo]);
  }

  return (
    <div className="container">
      <div className={'app'}>
        <Modal isVisible={isModalVisible} setIsVisible={setIsModalVisible}>
          <TodoCreateForm createTodo={createTodo}/>
        </Modal>
        <div className={'appBody'}>
          <div className="appBodyHeader">
            {
              isOverduedTodos
                ?
                <>
                  <Button click={() => setOverduedTodos([])}>Clear</Button>
                  <span onClick={() => setIsOverduedTodos(false)}>{'→'}</span>
                </>
                :
                <>
                  <span onClick={() => setIsModalVisible(true)}>+</span>
                  <Button click={() => setTodos([])}>Delete all</Button>
                  <Button click={() => setIsOverduedTodos(true)}>Overdued</Button>
                </>
            }
          </div>
          <div className="appBodyTodos">
              {
                isOverduedTodos
                  ?
                  <OverduedTodosList todos={overduedTodos}/>
                  :
                  <TodosList 
                    todos={todos}
                    deleteTodo={deleteTodo}
                    update={{todos, setTodos}}
                  />
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
