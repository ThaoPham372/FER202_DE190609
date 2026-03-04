import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Badge, Image } from 'react-bootstrap';
import { getAccounts, updateAccountStatus } from '../services/accountService';
import { useAuth } from '../contexts/AuthContext';
import FilterBar from '../components/FilterBar';
import ConfirmModal from '../components/ConfirmModal';
import ToastMessage from '../components/ToastMessage';

const AccountListPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('');
  const [confirmModal, setConfirmModal] = useState({ show: false, account: null, action: '' });
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch {
      showToast('Failed to load accounts', 'danger');
    }
  };

  const showToast = (message, variant = 'success') => {
    setToast({ show: true, message, variant });
  };

  const filtered = accounts
    .filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.username.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q);
      const matchRole = role === 'All' || a.role === role;
      const matchStatus = status === 'All' || a.status === status;
      return matchSearch && matchRole && matchStatus;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'username_asc':  return a.username.localeCompare(b.username);
        case 'username_desc': return b.username.localeCompare(a.username);
        case 'role_admin':    return a.role === 'admin' ? -1 : 1;
        case 'role_user':     return a.role === 'user'  ? -1 : 1;
        case 'status_active': return a.status === 'active' ? -1 : 1;
        case 'status_locked': return a.status === 'locked' ? -1 : 1;
        default:              return 0;
      }
    });

  const handleToggleStatus = (account) => {
    if (account.id === user?.id && account.status === 'active') {
      showToast('Cannot self-lock the currently logged-in admin.', 'warning');
      return;
    }
    const action = account.status === 'active' ? 'lock' : 'unlock';
    setConfirmModal({ show: true, account, action });
  };

  const handleConfirm = async () => {
    const { account, action } = confirmModal;
    const newStatus = action === 'lock' ? 'locked' : 'active';
    try {
      await updateAccountStatus(account.id, newStatus);
      setAccounts((prev) =>
        prev.map((a) => (a.id === account.id ? { ...a, status: newStatus } : a))
      );
      showToast(action === 'lock' ? 'Locked successfully' : 'Unlocked successfully');
    } catch {
      showToast('Failed to update status', 'danger');
    }
    setConfirmModal({ show: false, account: null, action: '' });
  };

  const confirmMessage =
    confirmModal.action === 'lock'
      ? `Lock account ${confirmModal.account?.username}? The user cannot log in after this`
      : `Unlock account ${confirmModal.account?.username}?`;

  return (
    <div className="list-wrapper">
      <div className="list-inner">
        <FilterBar
          search={search} setSearch={setSearch}
          role={role}     setRole={setRole}
          status={status} setStatus={setStatus}
          sort={sort}     setSort={setSort}
        />

        <Table bordered hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((account) => (
              <tr key={account.id}>
                <td className="align-middle">
                  <Image
                    src={account.avatar}
                    roundedCircle
                    width={42}
                    height={42}
                    style={{ objectFit: 'cover', border: '2px solid #dee2e6' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/42'; }}
                  />
                </td>
                <td className="align-middle fw-semibold">{account.username}</td>
                <td className="align-middle text-muted">{account.email}</td>
                <td className="align-middle" style={{ textTransform: 'capitalize' }}>
                  {account.role}
                </td>
                <td className="align-middle">
                  <Badge
                    bg={account.status === 'active' ? 'success' : 'secondary'}
                    className="px-2 py-1"
                  >
                    {account.status}
                  </Badge>
                </td>
                <td className="align-middle">
                  <div className="d-flex gap-1">
                    <Button
                      size="sm"
                      variant="info"
                      className="text-white fw-semibold"
                      onClick={() => navigate(`/accounts/${account.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant={account.status === 'active' ? 'danger' : 'success'}
                      className="fw-semibold"
                      onClick={() => handleToggleStatus(account)}
                    >
                      {account.status === 'active' ? 'Lock' : 'Unlock'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        message={confirmMessage}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmModal({ show: false, account: null, action: '' })}
      />

      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </div>
  );
};

export default AccountListPage;
