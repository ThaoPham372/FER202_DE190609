import React from 'react';

function UserItem({ user }) {
  return (
    <div className="py-3 px-3 border-bottom bg-white">
      <div className="fw-semibold">{user.name}</div>
      <div className="text-muted" style={{ fontSize: 14 }}>
        {user.email}
      </div>
    </div>
  );
}

export default UserItem;

