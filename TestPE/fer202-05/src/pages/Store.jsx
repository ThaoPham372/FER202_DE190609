import { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProducts } from '../contexts/ProductContext';
import { buyProductAction, fetchProductsAction } from '../services/ProductAPI';

function Store() {
    const { state, dispatch } = useProducts();

    useEffect(() => {
        // Fetch products only if empty, or just always fetch on mount
        fetchProductsAction(dispatch);
    }, [dispatch]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container className="mt-4 flex-grow-1">
                <Row xs={1} md={3} className="g-4">
                    {state.products && state.products.map((p) => (
                        <Col key={p.id}>
                            <Card className="h-100 text-center border-0 shadow-sm">
                                <Card.Img 
                                    src={p.img} 
                                    style={{ height: '250px', objectFit: 'cover' }} 
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/300x250?text=No+Photo";
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{p.name}</Card.Title>
                                    <Card.Text className="text-muted mb-1">Giá: {p.price.toLocaleString()} VND</Card.Text>
                                    <Card.Text className="fw-bold">Số lượng: {p.stock}</Card.Text>
                                    <Button
                                        variant="success"
                                        className="w-100"
                                        onClick={() => buyProductAction(dispatch, p)}
                                    >
                                        Mua ngay
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default Store;
