import { Card } from 'react-bootstrap';
import './Student.css';

function Student({ student }) {
  return (
    <Card className="student-card h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={student.avatar}
        alt={`${student.name} avatar`}
        className="student-card-img"
      />
      <Card.Body>
        <Card.Title className="mb-3">{student.name}</Card.Title>
        <Card.Text className="student-card-text mb-0">
          <div>
            <strong>ID:</strong> {student.id}
          </div>
          <div>
            <strong>Age:</strong> {student.age}
          </div>
          <div>
            <strong>Grade:</strong>{' '}
            <span className="badge bg-primary">{student.grade}</span>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Student;
