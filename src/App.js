import { useState } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import logo from './logo.svg';
import './App.css';
import { LIMIT, DELIMITER } from './constants/Preferences';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SourceBox from './SourceBox';
import ResultBox from './ResultBox';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [limit, setLimit] = useState(LIMIT);

  const $sourceText = new Subject();
  const $limit = new Subject();

  $sourceText
    .pipe(debounceTime(500))
    .subscribe((value) => setSourceText(value));

  $limit
    // .pipe(debounceTime(500))
    .subscribe((value) => setLimit(+value || 0));

  const handleLimitChange = (event) => {
      $limit.next(event.target.value || '');
    }

  const handleSourceTextChange = (event) => {
    $sourceText.next(event.target.value || '');
  }

  return (
    <Container>
      <Row>
        <h1>Text splitter</h1>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="appMaxLength">
            <Form.Label>Max length</Form.Label>
            <Form.Control type="number" placeholder="Max length" value={limit} min="0" onChange={handleLimitChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col><SourceBox handleKeyDown={handleSourceTextChange} /></Col>
        <Col><ResultBox sourceText={sourceText} limit={limit} delimiter={DELIMITER} /></Col>
      </Row>
    </Container>

  );
}

export default App;
