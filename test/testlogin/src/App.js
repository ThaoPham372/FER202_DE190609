import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Import các thành phần quản lý logic
import LoginForm from './components/LoginForm';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Lưu ý: Thay thế component này bằng trang Dashboard thật của bài thi
const Home = () => (
  <div className="container mt-5">
    <h2>Trang chủ (Dashboard)</h2>
    <p>Chào Thảo, bạn đã đăng nhập thành công!</p>
  </div>
);

function App() {
  return (
    // [NOTE]: Luôn bọc AuthProvider ngoài cùng để toàn bộ App dùng được Context [cite: 215, 227]
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* [NOTE]: Trang Login - Ai cũng vào được  */}
          <Route path="/login" element={<LoginForm />} />

          {/* [NOTE]: Trang bảo mật - Phải qua ProtectedRoute mới vào được  */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* [NOTE]: Điều hướng mặc định khi mở web hoặc gõ sai URL [cite: 196] */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
