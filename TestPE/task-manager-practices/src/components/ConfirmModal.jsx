import { Button, Modal } from 'react-bootstrap';

const ConfirmModal = ({
  show,
  onHide,
  onConfirm,
  title,
  message,
  type = 'confirm',
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h5">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center py-4">
        {/* Nếu là thành công thì hiện icon xanh, nếu là xóa thì hiện icon đỏ hoặc cảnh báo */}
        {type === 'success' ? (
          <div className="text-success mb-2" style={{ fontSize: '3rem' }}>
            ✅
          </div>
        ) : (
          <div className="text-danger mb-2" style={{ fontSize: '3rem' }}>
            ⚠️
          </div>
        )}
        <p className="mb-0">{message}</p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        {/* CHỖ QUAN TRỌNG: Nếu là loại 'confirm' (xóa) mới hiện nút Cancel */}
        {type === 'confirm' && (
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        )}

        {/* Nút chính: Xóa thì màu đỏ (danger), Thành công thì màu xanh (primary/success) */}
        <Button
          variant={type === 'success' ? 'primary' : 'danger'}
          onClick={onConfirm}
        >
          {type === 'success' ? 'OK' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
