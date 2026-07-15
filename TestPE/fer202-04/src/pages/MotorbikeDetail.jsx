import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useMotorbikes } from '../contexts/MotorbikeContext';

function MotorbikeDetail() {
    const { id } = useParams(); // [A] Lấy ID từ thanh địa chỉ
    const navigate = useNavigate();
    const { state } = useMotorbikes(); // [B] Lấy kho dữ liệu chung

    // [C] Tìm đúng người dùng đó trong kho
    const motorbike = state.items.find((u) => String(u.id) === id);

    if (!motorbike)
        return <Container className="mt-5">Motorbike not found!</Container>;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container className="mt-4 flex-grow-1">
                <Card className="shadow-sm border-0">
                    <Card.Header className="bg-white py-3">
                        <h5 className="mb-0 fw-bold text-secondary">Motorbike Details</h5>
                    </Card.Header>
                    <Card.Body>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={motorbike.image}
                                style={{ height: '300px', objectFit: 'contain' }}
                                /* Nếu ảnh ở src bị lỗi, nó sẽ tự động lấy link ảnh dự phòng ở dưới này */
                                onError={(e) => {
                                    e.target.src =
                                        'https://i.postimg.cc/vH5y229x/default-motorbike.png';
                                }}
                            />
                        </Card>
                        <Row className="align-items-center py-4">
                            <Col md={8}>
                                {/* Dùng Row/Col nhỏ bên trong để hiện nhãn và giá trị */}
                                <div className="mb-3">
                                    <h1 className="fw-bold">{motorbike.title}</h1>
                                </div>
                                {
                                    <div className="mb-3">
                                        <span className="fw-bold">{motorbike.description}</span>
                                    </div>
                                }
                                {
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Year</label>
                                        <span className="fw-bold">{motorbike.year}</span>
                                    </div>
                                }
                                {
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Price</label>
                                        <span className="fw-bold">{motorbike.price}</span>
                                    </div>
                                }

                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="bg-light border-0">
                        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
                            Back to list
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            <Footer />
        </div>
    );
}

export default MotorbikeDetail;
