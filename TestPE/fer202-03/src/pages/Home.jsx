import { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import ConfirmModal from '../components/ConfirmModal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import StatusAlert from '../components/StatusAlert';
import { usePatients } from '../contexts/PatientContext';
import {
  addPatientAction,
  deletePatientAction,
  fetchPatientsAction,
  updatePatientAction,
} from '../services/PatientsAPI';

function Home() {
  const { state, dispatch } = usePatients();

  // 1. State cho Form
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
  });

  // 2. State cho chế độ Sửa
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // 4. State cho Modal xác nhận xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 5. State cho Thông báo thành công
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchPatientsAction(dispatch);
  }, [dispatch]);

  // --- LOGIC HỖ TRỢ ---

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
      age: item.age,
      gender: item.gender,
      address: item.address,
    });
  };

  const handleReset = () => {
    setFormData({ name: '', age: '', gender: '', address: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deletePatientAction(dispatch, deleteId);
    setShowDeleteModal(false);
    triggerSuccess('Deleted successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.course ||
      !formData.topic ||
      !formData.rating ||
      !formData.comment
    ) {
      alert('Please fill all fields correctly!');
      return;
    }

    if (isEditing) {
      await updatePatientAction(dispatch, currentId, formData);
      triggerSuccess('Updated successfully!');
    } else {
      await addPatientAction(dispatch, formData);
      triggerSuccess('Added successfully!');
    }
    handleReset();
  }; // <-- Đã sửa: Thêm dấu đóng ngoặc nhọn ở đây

  return (
    /* [NOTE]: d-flex và flex-column giúp Footer luôn nằm ở cuối trang nếu dữ liệu ít */
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* 1. Header: Chứa Logo và tên người đang đăng nhập */}
      <Header />

      <Container className="mt-4 flex-grow-1">
        {/* 2. Tiêu đề trang: Thay đổi theo tên đề bài (vd: Product Management, Student Management) */}
        {/* [SỬA TẠI ĐÂY]: Gọi StatusAlert ở trên cùng để thông báo luôn đập vào mắt người dùng */}
        <StatusAlert
          show={showSuccess} // Biến để quyết định lúc nào hiện, lúc nào ẩn
          variant="success" // Màu sắc của thông báo (success: xanh, danger: đỏ)
          message={successMsg} // Nội dung thông báo
        />
        <h2 className="fw-bold mb-4">Patient Management</h2>

        {/* 3. KHỐI FORM NHẬP LIỆU (Nằm ngang toàn màn hình) */}
        <div className="mb-5">
          <Form onSubmit={handleSubmit}>
            {/* [MẸO]: Mỗi cặp Label + Input nên để trong một Form.Group */}
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                /* [LƯU Ý]: onChange là bắt buộc để bạn có thể gõ được chữ vào ô */
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Age</Form.Label>
              <Form.Control
                type="number" // Đề yêu cầu nhập số thì dùng type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Gender</Form.Label>
              <Form.Control
                type="text"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-muted small">Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </Form.Group>

            {/* 4. Nút bấm Submit: Tự động đổi chữ tùy theo đang Thêm hay đang Sửa */}
            <Button type="submit" variant="primary" className="px-4 py-2">
              {isEditing ? 'Update Patient' : 'Add Patient'}
            </Button>
          </Form>
        </div>

        {/* 5. KHỐI BẢNG DỮ LIỆU (Table) */}
        <Table
          bordered
          hover
          responsive
          className="align-middle border-light shadow-sm"
        >
          <thead className="table-light">
            {/* [GHI CHÚ]: Các tiêu đề cột (th) phải khớp với các thẻ td ở dưới */}
            <tr>
              <th className="fw-bold py-3">Name</th>
              <th className="fw-bold">Age</th>
              <th className="fw-bold">Gender</th>
              <th className="fw-bold">Address</th>
              <th className="fw-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* [LƯU Ý]: state.items là mảng chứa dữ liệu từ db.json đổ ra */}
            {state.items.map((item) => (
              <tr key={item.id}>
                <td className="py-3">{item.name}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.address}</td>
                <td>
                  {/* 6. Cặp nút bấm Hành động (Edit & Delete) */}
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2 text-dark"
                    onClick={() => handleEditClick(item)} // Khi bấm Edit sẽ đưa dữ liệu lên Form
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleOpenDelete(item.id)} // Khi bấm Delete sẽ hiện Modal xác nhận
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Do you really want to delete this patient?"
        type="confirm"
      />

      {/* 7. Footer: Thông báo bản quyền hoặc thông tin sinh viên */}
      <Footer />
    </div>
  );
}

export default Home;
