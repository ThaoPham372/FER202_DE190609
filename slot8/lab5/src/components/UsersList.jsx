import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { fetchUsers } from '../api/client';
import UserItem from './UserItem';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchUsers();
      if (isMounted) {
        setUsers(data);
      }
    } catch (err) {
      if (isMounted) {
        const networkMsg = !navigator.onLine
          ? `No internet connection. Please check your Wi‑Fi / network. Details: ${err.message}`
          : err.message;
        setError(networkMsg);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-4">
        <Spinner animation="border" role="status" size="sm" className="me-2" />
        <span>Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 text-center">
        <Alert variant="danger">
          Failed to load users: {error}
        </Alert>
        <Button variant="outline-primary" size="sm" onClick={load}>
          Reload
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-light border rounded-0">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UsersList;

