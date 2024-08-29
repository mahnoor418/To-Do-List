import React, { useState, useEffect } from 'react';

function AddInput() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input) {
      if (isEditing) {
        const updatedTodos = [...todos];
        updatedTodos[currentTodoIndex] = input;
        setTodos(updatedTodos);
        setIsEditing(false);
        setCurrentTodoIndex(null);
      } else {
        setTodos([...todos, input]);
      }
      setInput('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setInput(todos[index]);
    setIsEditing(true);
    setCurrentTodoIndex(index);
  };

  return (
    <div className="App">
      <h1>React To-Do App</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new to-do"
        />
        <button onClick={addTodo}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddInput;
