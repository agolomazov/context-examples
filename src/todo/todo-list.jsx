import React from 'react';
import PropType from 'prop-types';

import TodoItem from './todo-item';

const styles = {
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }
}

const TodoList = ({ todos, onToggle }) => {
  return (
    <ul style={styles.ul}>
      { todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onChange={() => onToggle(todo.id)}
        />
      )) }
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropType.arrayOf(PropType.object).isRequired,
  onToggle: PropType.func.isRequired,
};

export default TodoList;