const BASE_URL = 'http://localhost:3001';

// GET tất cả
export const getUser = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

// GET 1 item theo id
export const getUserById = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch one');
  return res.json();
};

// DELETE – dùng khi cần
export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete');
  return res.json();
};
