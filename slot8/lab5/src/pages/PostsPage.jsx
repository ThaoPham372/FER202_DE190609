import React, { Suspense } from 'react';
import { Container } from 'react-bootstrap';

const PostsList = React.lazy(() => import('../components/PostsList'));

function PostsPage() {
  return (
    <Container className="pb-3 px-0">
      <div className="users-header text-white d-flex align-items-center px-3">
        <span className="me-2" style={{ fontSize: 26 }}>
          👥
        </span>
        <h2 className="mb-0">Posts</h2>
      </div>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center py-4">
            <span>Loading posts module...</span>
          </div>
        }
      >
        <PostsList />
      </Suspense>
    </Container>
  );
}

export default PostsPage;

