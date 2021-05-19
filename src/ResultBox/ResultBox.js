import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.scss';

const ResultBox = (props) => {
  const resultBoxRef = React.useRef();
  const resultArray = [];
  let resultText;

  const splitAndJoinText = (line) => {
    const resultLineTextArray = [];
    const sourceTextDelimited = line.split(props.delimiter);
    let currentCell = '';

    sourceTextDelimited.forEach((word, index) => {
      const currentWord = (index === 0 ? word : ` ${word}`);

      if (currentCell.length + currentWord.length > props.limit && index > 0) {
        resultLineTextArray.push(currentCell);
        currentCell = '';
      }
      currentCell += currentWord;
    });

    if (currentCell.length) {
      resultLineTextArray.push(currentCell);
    }

    return resultLineTextArray.join('\t');
  };

  const handleClick = () => {
    resultBoxRef.current.select();
    document.execCommand('copy');
  };

  const sourceTextArray = props.sourceText.split('\n');
  sourceTextArray.forEach(line => {
    const resultLineText = splitAndJoinText(line);
    resultArray.push(resultLineText);
  });
  resultText = resultArray.join('\n');

  return (
    <>
      <Form>
        <Form.Group controlId="result">
          <Form.Label>Result</Form.Label>
          <Form.Control as="textarea" ref={resultBoxRef} onClick={handleClick} value={resultText} readOnly rows={props.screenWidth >= 576 ? 20 : 5} title="Click to copy" className={styles.textarea} />
        </Form.Group>
      </Form>
    </>
  );
};

export default ResultBox;
