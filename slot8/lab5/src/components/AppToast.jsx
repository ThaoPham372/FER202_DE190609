import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

function AppToast() {
  const { toast, hideToast } = useToast();

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 2000 }}>
      <Toast
        show={toast.show}
        onClose={hideToast}
        delay={2500}
        autohide
        bg={toast.variant}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default AppToast;

