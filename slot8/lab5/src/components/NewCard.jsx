import React from 'react';
import { Card } from 'react-bootstrap';

function NewCard({ newItem }) {
  return (
    <Card className="news-card h-100">
      <div className="news-card__media">
        <Card.Img className="news-card__img" variant="top" src={newItem.images} alt={newItem.title} />
      </div>
      <Card.Body className="news-card__body">
        <Card.Title className="news-card__title">{newItem.title}</Card.Title>
        <Card.Text className="news-card__desc">{newItem.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NewCard;

