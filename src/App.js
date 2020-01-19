import React, { useState, useEffect } from 'react';

import TodoList from './todo/todo-list';
import { Loader } from './loader';
import { Context } from './context';

const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./todo/add-todo'));
  }, 3000);
}));

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?limit=5')
      .then(response => response.json)
      .then(json => console.log(json))
      .catch(error => {
        setLoading(false);
      });
  }, []);

  const toggleTodo = id => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }

      return todo;
    }));
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = title => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        completed: false, 
      }
    ]);
  }

  return (
    <Context.Provider
      value={{
        removeTodo
      }}
    >
      <div className="wrapper">
        <h1>React tutorial</h1>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {!loading && todos.length > 0 && (
          <TodoList todos={todos} onToggle={toggleTodo} />
        )}
        {!loading && !todos.length && <p>No todos</p>}
      </div>
    </Context.Provider>
  );
}

export default App;
