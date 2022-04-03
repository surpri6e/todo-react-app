import React from 'react'
import '../styles/TodoCreateForm.css'
import { ISelectOption, ITodoItem } from '../types'
import Button from './UI/Button/Button';
import Input from './UI/Input/Input';
import Select from './UI/Select/Select';

interface TodoCreateFormProps {
    createTodo: (todo: ITodoItem) => void;
}

const TodoCreateForm: React.FC<TodoCreateFormProps> = ({createTodo}) => {
    const [textTodo, setTextTodo] = React.useState<string>('');
    const [additionalTodo, setAdditionalTodo] = React.useState<string>('');
    const [timeTodo, setTimeTodo] = React.useState<number>(0);
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

    const createNewTodo = (ev: React.MouseEvent<HTMLButtonElement>): void => {
        ev.preventDefault();

        createTodo({
            additional: additionalTodo,
            text: textTodo,
            completed: false,
            id: Date.now(),
            time: timeTodo,
            date: new Date(),
        })

        setTextTodo('');
        setAdditionalTodo('');
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 3000)
    }

    const options: ISelectOption[] = [
        {value: 0, text: 'Always'},
        {value: 1, text: '1 min'},
        {value: 5, text: '5 min'},
        {value: 10, text: '10 min'},
        {value: 30, text: '30 min'},
        {value: 60, text: '1 h'},
        {value: 90, text: '1.5 h'},
        {value: 120, text: '2 h'},
        {value: 240, text: '4 h'},
        {value: 480, text: '8 h'},
    ]

  return (
    <form className={'createTodo'}>
        <Input 
            params={{placeholder: 'Text', type: 'text', value: textTodo}}
            change={ev => setTextTodo(ev.target.value)}
            maxLength={200}
        />
        <Input 
            params={{placeholder: 'Additional', type: 'text', value: additionalTodo}}
            change={ev => setAdditionalTodo(ev.target.value)}
            maxLength={60}
        />
        <Select options={options} change={time => setTimeTodo(time)}/>
        <Button click={createNewTodo} disabled={isDisabled}>Create Todo</Button>
    </form>
  )
}

export default TodoCreateForm