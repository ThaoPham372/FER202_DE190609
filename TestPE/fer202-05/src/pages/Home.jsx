import { useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProducts } from '../contexts/ProductContext';
import { fetchProductsAction } from '../services/ProductAPI';

function Home() {
    const { state, dispatch } = useProducts(); 

    useEffect(() => {
        fetchProductsAction(dispatch);
    }, [dispatch]);

    return (
        <div className="d-flex flex-column min-vh-100 bg-white">
            <Header />

            {/* PHẦN CHÍNH: CAROUSEL (Slide ảnh) */}
            <Container className="my-0 px-0" fluid>
                <Carousel fade interval={3000}>
                    {state.products && state.products.map((item) => (
                        <Carousel.Item key={item.id}>
                            <img
                                className="d-block w-100"
                                src={item.img}
                                alt={item.name}
                                style={{ height: '500px', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/800x500?text=No+Photo";
                                }}
                            />
                            <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
                                <h3 className="fw-bold">{item.name}</h3>
                                <p>${item.price} - Fresh from nature</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>

            <Footer />
        </div>
    );
}

export default Home;
