import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Store from './pages/Store';
import { ProductProvider } from './contexts/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          {/* Trang chủ với Carousel ảnh */}
          <Route path="/home" element={<Home />} />

          {/* Trang cửa hàng hiển thị danh sách sản phẩm và nút mua */}
          <Route path="/store" element={<Store />} />

          {/* Điều hướng mặc định về Home nếu nhập link sai */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
