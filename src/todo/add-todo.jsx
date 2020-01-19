import React, { useState } from 'react';
import PropType from 'prop-types';

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    onChange: event => {
      setValue(event.target.value);
    }
  };
}

const AddTodo = ({ onCreate }) => {
  const input = useInputValue('');

  const submitHandler = ev => {
    ev.preventDefault();

    if (!input.value.trim()) {
      return;
    }

    onCreate(input.value);
    input.onChange({ target: { value: '' } });
  }

  return (
    <form
      style={{
        marginBottom: '1rem'
      }}
      onSubmit={submitHandler}
    >
      <input
        type="text"
        {...input}
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

AddTodo.propTypes = {
  onCreate: PropType.func.isRequired,
}

export default AddTodo;