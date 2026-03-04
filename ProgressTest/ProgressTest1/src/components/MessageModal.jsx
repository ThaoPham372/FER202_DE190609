import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ show, username, onContinue }) => {
  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Login Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Welcome, <strong>{username}</strong>! You have successfully logged in.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onContinue}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
