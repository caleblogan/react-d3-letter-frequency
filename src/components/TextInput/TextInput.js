import React from 'react';

import styles from './TextInput.scss';

const TextInput = ({value, onChange}) => {
  return (
    <textarea value={value} onChange={onChange}/>
  );
};

export default TextInput;
