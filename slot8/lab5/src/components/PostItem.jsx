import React from 'react';

function PostItem({ post }) {
  return (
    <div className="p-3 border-bottom bg-white">
      <h5 className="mb-1" style={{ fontWeight: 600 }}>
        {post.title}
      </h5>
      <p className="mb-0 text-muted" style={{ fontSize: 14, lineHeight: 1.6 }}>
        {post.body}
      </p>
    </div>
  );
}

export default PostItem;

