import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { state } = useAuth(); // Lấy trạng thái đăng nhập từ Context [cite: 194]

  // Nếu chưa đăng nhập (isAuthenticated = false), đá về trang login [cite: 195, 196]
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Nếu rồi thì cho phép xem nội dung bên trong [cite: 198]
  return children;
}

export default ProtectedRoute;
