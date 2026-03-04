import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, message, onConfirm, onCancel }) => {
  return (
    <Modal show={show} centered onHide={onCancel}>
      <Modal.Body className="text-center py-4">{message}</Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
