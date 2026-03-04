uoconst BASE_URL = 'http://localhost:3001';

export const getAccounts = async () => {
  const res = await fetch(`${BASE_URL}/accounts`);
  if (!res.ok) throw new Error('Failed to fetch accounts');
  return res.json();
};

export const getAccountById = async (id) => {
  const res = await fetch(`${BASE_URL}/accounts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch account');
  return res.json();
};

export const updateAccountStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/accounts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update account');
  return res.json();
};
