import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { fetchPosts } from '../api/client';
import PostItem from './PostItem';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPosts();
      if (isMounted) {
        setPosts(data.slice(0, 12)); // limit for layout
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
        <span>Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 text-center">
        <Alert variant="danger">
          Failed to load posts: {error}
        </Alert>
        <Button variant="outline-primary" size="sm" onClick={load}>
          Reload
        </Button>
      </div>
    );
  }

  return (
    <div className="row g-0">
      {posts.map((post) => (
        <div key={post.id} className="col-12 col-md-6 col-lg-4">
          <PostItem post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostsList;

