import React from 'react';
import { Form } from 'semantic-ui-react';

import styles from './TextInput.scss';

const TextInput = ({value, onChange}) => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.TextArea className={styles.textArea} value={value} onChange={onChange} label="Text to Analyze"/>
    </Form>
  );
};

export default TextInput;
