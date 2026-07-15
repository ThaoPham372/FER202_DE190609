import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// [1] Import các "Kho chứa dữ liệu" (Context Providers)
import { AuthProvider } from './contexts/AuthContext';
import { MotorbikeProvider } from './contexts/MotorbikeContext';
import { CartProvider } from './contexts/CartContext';

// [2] Import các "Người gác cổng" và "Giao diện"
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import MotorbikeDetail from './pages/MotorbikeDetail';
import Cart from './pages/Cart';
function App() {
  return (
    // [A] AuthProvider: Lớp bảo vệ ngoài cùng (Quản lý ai đang đăng nhập)
    <AuthProvider>
      {/* [B] MotorbikeProvider: Lớp quản lý dữ liệu (Quản lý danh sách chi tiêu) */}
      <MotorbikeProvider>
        <CartProvider>
          {/* [C] BrowserRouter: Kích hoạt khả năng chuyển trang (URL) */}
          <BrowserRouter>
            <Routes>
              {/* [D] Route công khai: Ai cũng vào được trang Login */}
              <Route path="/login" element={<LoginForm />} />

              {/* [E] Route bảo mật: Chỉ cho vào Home nếu đã qua lớp ProtectedRoute */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

            // Thêm Route cho trang chi tiết (nhớ bọc ProtectedRoute để bảo mật)
              <Route
                path="/motorbike/:id"
                element={
                  <ProtectedRoute>
                    <MotorbikeDetail />
                  </ProtectedRoute>
                }
              />

              {/* [F] Điều hướng mặc định: Nếu gõ bậy hoặc vào trang chủ, đẩy về Login */}
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </MotorbikeProvider>
    </AuthProvider>
  );
}

export default App;
