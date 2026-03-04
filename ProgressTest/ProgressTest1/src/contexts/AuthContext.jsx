import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('loggedUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (account) => {
    setUser(account);
    sessionStorage.setItem('loggedUser', JSON.stringify(account));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('loggedUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
