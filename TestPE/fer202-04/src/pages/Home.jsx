import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import ConfirmModal from '../components/ConfirmModal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import StatusAlert from '../components/StatusAlert';
import { useMotorbikes } from '../contexts/MotorbikeContext'; // Đã sửa tên Context cho đúng
import {
  addMotorbikeAction,
  fetchMotorbikesAction,
  updateMotorbikeAction,
} from '../services/MotorbikeAPI';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';


function Home() {
  const { state, dispatch } = useMotorbikes();

  // 1. State cho Form (Sửa lại tên trường cho đúng đề Motorbike)
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [sortBy, setSortBy] = useState('None');
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state riêng cho tìm kiếm
  const navigate = useNavigate();

  const { state: cartState, dispatch: cartDispatch } = useCart();
  const handleAddToCart = async (motorbike) => {
    if (motorbike.stock <= 0) {
      alert("Out of stock!");
      return;
    }
    // A. Giảm Stock trên JSON Server (Gửi lệnh PUT/PATCH)
    const updatedMotorbike = { ...motorbike, stock: motorbike.stock - 1 };
    await updateMotorbikeAction(dispatch, motorbike.id, updatedMotorbike);

    // B. Thêm vào Giỏ hàng (Gửi lệnh ADD_TO_CART)
    cartDispatch({ type: 'ADD_TO_CART', payload: motorbike });

    triggerSuccess(`${motorbike.title} has been added to your cart.`);
  };


  useEffect(() => {
    fetchMotorbikesAction(dispatch);
  }, [dispatch]);

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // --- HÀM XỬ LÝ (Đã sửa tên biến name -> title) ---

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
    });
  };

  const handleReset = () => {
    setFormData({ title: '', price: '', description: '', image: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert('Please fill Title and Price!');
      return;
    }

    if (isEditing) {
      await updateMotorbikeAction(dispatch, currentId, formData);
      triggerSuccess('Updated successfully!');
    } else {
      await addMotorbikeAction(dispatch, formData);
      triggerSuccess('Added successfully!');
    }
    handleReset();
  };

  // BƯỚC LỌC DỮ LIỆU
  const filteredItems = state.items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // BƯỚC SẮP XẾP (Sửa lại logic trừ số cho Price)
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'Price_AZ') return a.price - b.price;
    if (sortBy === 'Price_ZA') return b.price - a.price;
    return 0;
  });



  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />

      <Container className="mt-4 flex-grow-1">
        <StatusAlert show={showSuccess} variant="success" message={successMsg} />
        <h2 className="fw-bold mb-4">Motorbike List</h2>

        <div className="text-center mb-4">
          <Button variant="info" className="text-white fw-bold" onClick={() => navigate('/cart')}>
            View Cart ({cartState.items.length})
          </Button>
        </div>

        {/* PHẦN TÌM KIẾM VÀ SẮP XẾP (Phía trên lưới) */}
        <Row className="mb-4 d-flex justify-content-center">
          <Col md={4}>
            <Form.Control
              placeholder="Search by model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="None">Sort by Price</option>
              <option value="Price_AZ">Price: Low to High</option>
              <option value="Price_ZA">Price: High to Low</option>
            </Form.Select>
          </Col>
        </Row>

        {/* PHẦN LƯỚI CARD GIỐNG ẢNH MẪU */}
        <Row xs={1} md={2} lg={4} className="g-4">
          {sortedItems.map((motorbike) => (
            <Col key={motorbike.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={motorbike.image}
                  style={{ height: '160px', objectFit: 'cover' }}
                  /* Nếu ảnh ở src bị lỗi, nó sẽ tự động lấy link ảnh dự phòng ở dưới này */
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Photo";
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{motorbike.title}</Card.Title>
                  <div className="small text-muted mb-3">
                    <p className="mb-1">Price: ${motorbike.price}</p>
                    <p className="mb-0">Stock: {motorbike.stock}</p>
                  </div>
                  <div className="mt-auto d-flex gap-2">
                    <Button variant="primary" size="sm" className="me-2" onClick={() => navigate("/motorbike/" + motorbike.id)}>
                      View Details
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100"
                      onClick={() => handleAddToCart(motorbike)} // Gọi hàm vừa viết
                    >
                      Add to Cart
                    </Button>
                  </div>
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

export default Home;
