import Card from 'react-bootstrap/Card';

function About({ student }) {
  return (
    <Card
      className="h-100 shadow-sm border-0"
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <Card.Img
        variant="top"
        src={student.avatar}
        alt="Student avatar"
        style={{
          height: '280px',
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title
          className="mb-3"
          style={{ fontSize: '1.25rem', fontWeight: '600' }}
        >
          {student.name}
        </Card.Title>
        <Card.Text
          className="flex-grow-1 mb-0"
          style={{ fontSize: '0.95rem', lineHeight: '1.8' }}
        >
          <div className="mb-2">
            <strong>ID:</strong>{' '}
            <span className="text-muted">{student.id}</span>
          </div>
          <div className="mb-2">
            <strong>Age:</strong>{' '}
            <span className="text-muted">{student.age}</span>
          </div>
          <div>
            <strong>Grade:</strong>{' '}
            <span
              className="badge bg-primary"
              style={{ fontSize: '0.85rem', padding: '0.35em 0.65em' }}
            >
              {student.grade}
            </span>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default About;
