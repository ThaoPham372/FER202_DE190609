import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import AccountListPage from '../pages/AccountListPage';
import AccountDetailPage from '../pages/AccountDetailPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <AccountListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts/:id"
        element={
          <ProtectedRoute>
            <AccountDetailPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
