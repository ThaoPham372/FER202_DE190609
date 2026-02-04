import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NewCard from '../components/NewCard';
import { newLists } from '../data/newsList';

function NewPage() {
  return (
    <div className="news-page">
      <div className="news-hero">
        <Container>
          <div className="news-hero__inner">
            <h1 className="news-hero__title">Latest News</h1>
            <p className="news-hero__sub">
              Fresh updates, trending stories, and tasty inspirations for your next meal.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-4">
        <Row className="g-3 g-lg-4">
        {newLists.map((newItem) => (
          <Col key={newItem.id} sm={12} md={6} lg={4}>
            <NewCard newItem={newItem} />
          </Col>
        ))}
        </Row>
      </Container>
    </div>
  );
}

export default NewPage;

