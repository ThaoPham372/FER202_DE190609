import { Card } from 'react-bootstrap';

function Student({ student }) {
  return (
    <Card
      className="h-100 shadow-sm border-0"
      style={{ borderRadius: '12px', overflow: 'hidden', width: '100%' }}
    >
      <Card.Img
        variant="top"
        src={student.avatar}
        alt={`${student.name} avatar`}
        style={{ height: '260px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title className="mb-3">{student.name}</Card.Title>
        <Card.Text className="mb-0" style={{ lineHeight: '1.8' }}>
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
