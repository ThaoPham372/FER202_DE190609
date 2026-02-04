import React from 'react';
import { Carousel } from 'react-bootstrap';
import { slideImages } from '../data/slideImages';

function SlideBar() {
  return (
    <Carousel className="app-carousel" fade>
      {slideImages.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 app-carousel__img"
            src={item.image}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default SlideBar;

