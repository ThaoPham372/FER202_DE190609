import React, { Suspense } from 'react';
import { Container } from 'react-bootstrap';

const UsersList = React.lazy(() => import('../components/UsersList'));

function UsersPage() {
  return (
    <Container className="pb-3 px-0">
      <div className="users-header text-white d-flex align-items-center px-3">
        <span className="me-2" style={{ fontSize: 26 }}>
          👥
        </span>
        <h2 className="mb-0">Users</h2>
      </div>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center py-4">
            <span>Loading users module...</span>
          </div>
        }
      >
        <UsersList />
      </Suspense>
    </Container>
  );
}

export default UsersPage;

