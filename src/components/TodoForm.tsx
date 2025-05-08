import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

interface TodoFormProps {
  addTodo: (text: string) => void;  // Define type for addTodo function prop
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState<string>('');  // Specify state type

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)} className="todo-input"
      />
      <button type="submit" className="todo-add"><AddIcon/></button>
    </form>
  );
};

export default TodoForm;