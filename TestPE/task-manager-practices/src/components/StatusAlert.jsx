import { Alert } from 'react-bootstrap';

const StatusAlert = ({ show, variant, message, onClose }) => {
  if (!show) return null;

  return (
    <Alert
      variant={variant}
      dismissible={!!onClose}
      onClose={onClose}
      className="text-center shadow-sm"
    >
      {variant === 'success' ? '✅ ' : '❌ '}
      {message}
    </Alert>
  );
};

export default StatusAlert;
