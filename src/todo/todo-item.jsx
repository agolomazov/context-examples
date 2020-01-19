import React, { useContext } from 'react';
import PropType from 'prop-types';
import { Context } from '../context';

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '.5rem'
  },
  input: {
    marginRight: '1rem'
  },
  label: {
    cursor: 'pointer'
  }
}

const TodoItem = ({
  todo: { id, title, completed },
  onChange,
  index,
}) => {
  const { removeTodo } = useContext(Context);

 const classes = [];
 
 if (completed) {
   classes.push('done');
 }

  return (
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input
          type="checkbox"
          style={styles.input}
          onChange={onChange}
          checked={completed}
          id={`input_${id}`}
        />
        <label htmlFor={`input_${id}`} style={styles.label}>
          <strong>{index + 1}</strong> {title}
        </label>
      </span>
      <button 
        className="rm"
        onClick={() => removeTodo(id)}
      >&times;</button>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropType.shape({
    id: PropType.number.isRequired,
    title: PropType.string.isRequired,
    completed: PropType.bool.isRequired,
  }).isRequired,
  index: PropType.number.isRequired,
  onChange: PropType.func.isRequired,
}

export default TodoItem;