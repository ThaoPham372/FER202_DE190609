//HeroCarousel.jsx dùng để tạo 1 carousel hiển thị các hình ảnh
import { Carousel } from 'react-bootstrap';
import { banners } from '../data/bannerimage';
import '../styles/pizzaHouse.css';

function HeroCarousel() {
  return (
    <div className="ph-hero">
      <Carousel fade={true} interval={2000} pause="hover">
      {banners.map((banner, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={banner.image} alt={`Slide ${index + 1}`} />
          <Carousel.Caption>
            <div className="ph-hero-title">{banner.title}</div>
            <div className="ph-hero-desc">{banner.description}</div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
