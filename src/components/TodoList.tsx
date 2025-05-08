import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className="todo-checkbox"
          />
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)} className="delete-button">
            <DeleteIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;