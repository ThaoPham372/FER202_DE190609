import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import ConfirmModal from '../components/ConfirmModal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import StatusAlert from '../components/StatusAlert';
import { useExpenses } from '../contexts/ExpenseContext';
import {
  addExpenseAction,
  deleteExpenseAction,
  fetchExpensesAction,
  updateExpenseAction,
} from '../services/ExpenseAPI';
import { formatDate, formatVND } from '../services/formatUtils';

function Home() {
  const { state, dispatch } = useExpenses();

  // 1. State cho Form
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });

  // 2. State cho chế độ Sửa
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // 3. State cho Bộ lọc
  const [filterCategory, setFilterCategory] = useState('All categories');

  // 4. State cho Modal xác nhận xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 5. State cho Thông báo thành công
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchExpensesAction(dispatch);
  }, [dispatch]);

  // --- LOGIC HỖ TRỢ ---

  const categories = [
    'All categories',
    ...new Set(state.items.map((item) => item.category)),
  ];

  const filteredItems =
    filterCategory === 'All categories'
      ? state.items
      : state.items.filter((item) => item.category === filterCategory);

  const total = state.items.reduce((sum, item) => sum + Number(item.amount), 0);

  // Hàm kích hoạt thông báo tự ẩn sau 2s
  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // --- CÁC HÀM XỬ LÝ ---

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({
      name: item.name,
      amount: item.amount,
      category: item.category,
      date: item.date,
    });
  };

  const handleReset = () => {
    setFormData({ name: '', amount: '', category: '', date: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteExpenseAction(dispatch, deleteId);
    setShowDeleteModal(false);
    triggerSuccess('Deleted successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || Number(formData.amount) <= 0) {
      alert('Please fill all fields correctly (Amount > 0)!');
      return;
    }

    if (isEditing) {
      await updateExpenseAction(dispatch, currentId, formData);
      triggerSuccess('Updated successfully!');
    } else {
      await addExpenseAction(dispatch, formData);
      triggerSuccess('Added successfully!');
    }
    handleReset();
  }; // <-- Đã sửa: Thêm dấu đóng ngoặc nhọn ở đây

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {/* Thông báo thành công */}
      <Container className="mt-3">
        <StatusAlert
          show={showSuccess}
          variant="success"
          message={successMsg}
        />
      </Container>

      <Container className="flex-grow-1 mb-5 mt-2">
        <Row>
          {/* CỘT TRÁI: TOTAL & FORM */}
          <Col md={4}>
            <Card className="mb-3 shadow-sm border-0 bg-light text-center py-2">
              <Card.Body>
                <Card.Title className="text-muted small mb-1">
                  Total of Expenses
                </Card.Title>
                <h3 className="fw-bold text-primary">{formatVND(total)}</h3>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Header className="bg-white fw-bold border-0 pt-3">
                {isEditing ? 'Edit Expense' : 'Add Expense'}
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-2">
                    <Form.Label className="small">Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="small">Amount</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="small">Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="small">Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button
                      variant="secondary"
                      className="w-100"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button
                      variant={isEditing ? 'success' : 'primary'}
                      type="submit"
                      className="w-100"
                    >
                      {isEditing ? 'Save' : 'Add expense'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* CỘT PHẢI: FILTER & TABLE */}
          <Col md={8}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title className="small">Filter</Card.Title>
                <Form.Group>
                  <Form.Label className="small text-muted">Category</Form.Label>
                  <Form.Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Header className="bg-white fw-bold border-0 pt-3">
                Expense Management
              </Card.Header>
              <Card.Body className="p-0">
                <Table striped hover responsive className="mb-0">
                  <thead className="table-light text-center">
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center align-middle">
                    {filteredItems.map((item) => (
                      <tr key={item.id}>
                        <td className="text-start ps-3">{item.name}</td>
                        <td>{formatVND(item.amount)}</td>
                        <td>{item.category}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2 text-white px-3"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="px-3"
                            onClick={() => handleOpenDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />

      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Do you really want to delete this expense?"
        type="confirm" // truyền dạng thông báo ở đây
      />
    </div>
  );
}

export default Home;
