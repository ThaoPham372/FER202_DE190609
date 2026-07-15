import { Button, Modal } from 'react-bootstrap';

const ConfirmModal = ({
  show,
  onHide,
  onConfirm,
  title,
  message,
  type = 'confirm', // 'success', 'confirm', 'warning'
}) => {
  // Tự động quyết định màu sắc và chữ trên nút dựa vào 'type'
  const isSuccess = type === 'success';
  const mainButtonText = isSuccess ? 'Continue' : 'Confirm';
  const mainButtonVariant = isSuccess ? 'success' : 'danger'; // Thành công thì xanh, Khoá thì đỏ

  return (
    <Modal show={show} onHide={onHide} centered>
      {/* 1. Header: Chỉ hiện nếu có title và không phải dạng Success dẹt */}
      {title && (
        <Modal.Header className={isSuccess ? "bg-light justify-content-center" : ""}>
          <Modal.Title className="h6 fw-bold">{title}</Modal.Title>
        </Modal.Header>
      )}

      {/* 2. Body: Chứa nội dung câu hỏi */}
      <Modal.Body className="py-4">
        <p className="mb-0 fs-5">{message}</p>
      </Modal.Body>

      {/* 3. Footer: Chứa 2 nút bấm */}
      <Modal.Footer className="border-top-0 pt-0">
        <Button variant="secondary" className="px-4" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant={mainButtonVariant}
          className="px-4 fw-bold"
          onClick={onConfirm}
        >
          {mainButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
