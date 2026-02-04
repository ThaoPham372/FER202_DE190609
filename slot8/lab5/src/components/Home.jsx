import React from 'react';
import { Card, Container } from 'react-bootstrap';
import SlideBar from './SlideBar';

function Home() {
  return (
    <Container className="mt-4">
      <div className="mb-4">
        <SlideBar />
      </div>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>1. Thông tin tác giả</Card.Title>
          <Card.Text>
            * <strong>Mã SV:</strong> DE190609 <br />
            * <strong>Họ tên:</strong> Thao Pham <br />
            * <strong>GitHub:</strong>{' '}
            <a href="https://github.com/ThaoPham372/FER202_DE190609.git">Link Github</a>
          </Card.Text>
          <hr />
          <Card.Title>2. Cấu trúc project</Card.Title>
          <p>Project được tổ chức theo cấu trúc Component-based với React-Bootstrap.</p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;

