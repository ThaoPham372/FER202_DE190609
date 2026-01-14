import { Col, Container, Row } from 'react-bootstrap';
import Student from './Student.jsx';
import studentData from './studentData.js';

function StudenList() {
  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: '1400px' }}>
      <h1 className="text-center mb-5">Thao Pham</h1>
      <Row
        className="g-4 justify-content-center"
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {studentData.map((student) => (
          <Col
            key={student.id}
            xs={12}
            sm={6}
            md={4}
            lg={2}
            xl={2}
            className="d-flex justify-content-center"
            style={{ flex: '0 0 20%', maxWidth: '20%', minWidth: '200px' }}
          >
            <div style={{ width: '100%', maxWidth: '300px' }}>
              <Student student={student} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default StudenList;
