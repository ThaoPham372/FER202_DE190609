import { Col, Container, Row } from 'react-bootstrap';
import listOfStudent from '../listOfStudent.js';
import About from './About.jsx';

function StudentList() {
  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: '1400px' }}>
      <h1
        className="text-center mb-5"
        style={{ fontWeight: '600', color: '#333' }}
      >
        Student List
      </h1>
      <Row className="g-4 justify-content-center">
        {listOfStudent.map((student) => (
          <Col
            key={student.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="d-flex justify-content-center"
          >
            <div style={{ width: '100%', maxWidth: '300px' }}>
              <About student={student} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default StudentList;
