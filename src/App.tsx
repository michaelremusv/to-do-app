import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles.css';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/todos/')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error loading todos:', err));
  }, []);

  const addTodo = (text: string) => {
    fetch('http://localhost:8000/api/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, completed: false }),
    })
      .then(res => res.json())
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(err => console.error('Error adding todo:', err));
  };

  const toggleComplete = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    fetch(`http://localhost:8000/api/todos/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    })
      .then(res => res.json())
      .then(updatedTodo => {
        setTodos(todos.map(t => t.id === id ? updatedTodo : t));
      })
      .catch(err => console.error('Error updating todo:', err));
  };

  const deleteTodo = (id: number) => {
    fetch(`http://localhost:8000/api/todos/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(t => t.id !== id));
      })
      .catch(err => console.error('Error deleting todo:', err));
  };

  return (
    <div className="app">
  <h1>To-Do List</h1>
  <div className="todo-container">
    <TodoForm addTodo={addTodo} />
    <TodoList
      todos={todos}
      toggleComplete={toggleComplete}
      deleteTodo={deleteTodo}
    />
  </div>
</div>
  );
};

export default App;