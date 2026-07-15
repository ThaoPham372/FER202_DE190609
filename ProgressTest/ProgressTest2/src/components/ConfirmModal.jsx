import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '1.1rem', fontWeight: 600 }}>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4 text-muted">
                Do you really want to delete this expense?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} size="sm" className="px-3" style={{ border: 'none' }}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm} size="sm" className="px-3" style={{ border: 'none' }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
