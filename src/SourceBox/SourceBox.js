import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.scss';

const SourceBox = (props) => {
  return (
    <>
      <Form>
        <Form.Group controlId="source">
          <Form.Label>Source</Form.Label>
          <Form.Control as="textarea" onChange={props.handleKeyDown} rows="20" className={styles.textarea} />
        </Form.Group>
      </Form>
    </>
  );
};

export default SourceBox;
