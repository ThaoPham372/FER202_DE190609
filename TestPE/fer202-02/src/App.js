import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// [1] Import các "Kho chứa dữ liệu" (Context Providers)
import { AuthProvider } from './contexts/AuthContext';
import { ExpenseProvider } from './contexts/ExpenseContext';

// [2] Import các "Người gác cổng" và "Giao diện"
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    // [A] AuthProvider: Lớp bảo vệ ngoài cùng (Quản lý ai đang đăng nhập)
    <AuthProvider>
      {/* [B] ExpenseProvider: Lớp quản lý dữ liệu (Quản lý danh sách chi tiêu) */}
      <ExpenseProvider>
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

            {/* [F] Điều hướng mặc định: Nếu gõ bậy hoặc vào trang chủ, đẩy về Login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
