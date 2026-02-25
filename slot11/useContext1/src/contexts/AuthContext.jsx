import React, { createContext, useContext, useMemo, useState } from 'react';

// Mock data thay thế cho API call
const mockAccounts = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
    status: 'active',
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    password: '123456',
    role: 'user',
    status: 'active',
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    password: '123456',
    role: 'user',
    status: 'locked',
  },
];

// 1. Khởi tạo AuthContext với giá trị mặc định
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  authError: null,
  login: () => false,
  logout: () => {},
});

// 2. Tạo AuthProvider để bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  // Hàm đăng nhập dùng mockAccounts, không gọi server
  const login = (username, password) => {
    setAuthError(null);

    const account = mockAccounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (!account) {
      setAuthError('Invalid username or password.');
      return false;
    }

    if (account.role !== 'admin') {
      setAuthError('Only admin accounts are allowed to login.');
      return false;
    }

    if (account.status !== 'active') {
      setAuthError('This account is not active.');
      return false;
    }

    setUser(account);
    return true;
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      authError,
      login,
      logout,
    }),
    [user, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

