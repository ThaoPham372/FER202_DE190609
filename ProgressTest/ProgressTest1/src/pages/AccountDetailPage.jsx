import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Image, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccountById } from '../services/accountService';

const AccountDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getAccountById(id)
      .then(setAccount)
      .catch(() => setError('Account not found.'));
  }, [id]);

  if (error) {
    return (
      <div className="detail-wrapper">
        <div style={{ width: '100%', maxWidth: '540px' }}>
          <Alert variant="danger">{error}</Alert>
          <Button variant="secondary" onClick={() => navigate('/accounts')}>
            Back to list
          </Button>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="detail-wrapper">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="detail-wrapper">
      <Card className="detail-card">
        <Card.Header>
          <h5 className="mb-0">Account Details</h5>
        </Card.Header>

        <Card.Body>
          <div className="d-flex gap-4 align-items-center">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={account.avatar}
                roundedCircle
                width={110}
                height={110}
                style={{ objectFit: 'cover', border: '3px solid #dee2e6', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/110'; }}
              />
            </div>

            {/* Info */}
            <div className="flex-grow-1">
              <p className="detail-info-label">Username</p>
              <p className="detail-info-value">{account.username}</p>

              <p className="detail-info-label">Email</p>
              <p className="detail-info-value">{account.email}</p>

              <p className="detail-info-label">Role</p>
              <p className="detail-info-value" style={{ textTransform: 'capitalize' }}>
                {account.role}
              </p>

              <p className="detail-info-label">Status</p>
              <Badge
                bg={account.status === 'active' ? 'success' : 'secondary'}
                className="px-2 py-1"
              >
                {account.status === 'active' ? 'Active' : 'Locked'}
              </Badge>
            </div>
          </div>
        </Card.Body>

        <Card.Footer>
          <Button variant="secondary" onClick={() => navigate('/accounts')}>
            Back to list
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AccountDetailPage;
