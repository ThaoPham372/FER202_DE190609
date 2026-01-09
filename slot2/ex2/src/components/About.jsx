import Card from 'react-bootstrap/Card';
import './StudentCard.css';

function About({ student }) {
  const { id, name, avatar, grade, age } = student;

  return (
    <Card style={{ width: '18rem' }} className="student-card">
      <Card.Img
        variant="top"
        src={avatar}
        alt={name}
        className="student-card__avatar"
      />
      <Card.Body>
        <Card.Title className="student-card__name">{name}</Card.Title>
        <Card.Text className="student-card__info">
          ID: {id}
          <br />
          Age: {age}
          <br />
          Grade: {grade}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default About;
