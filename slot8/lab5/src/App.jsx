import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppToast from './components/AppToast';
import DangKyForm from './components/DangKyForm';
import Home from './components/Home';
import NavBarPizza from './components/NavBarPizza';
import { ToastProvider } from './context/ToastContext';
import ContactPage from './pages/ContactPage';
import NewPage from './pages/NewPage';
import PostsPage from './pages/PostsPage';
import QuizPage from './pages/QuizPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <ToastProvider>
      <Router>
        {/* Thanh điều hướng cho ứng dụng đặt pizza */}
        <NavBarPizza />
        <AppToast />

        {/* Điều hướng ứng dụng đặt pizza với các liên kết đến các trang khác nhau */}
        <main className="app-main">
          <div className="app-shell">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<NewPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/register" element={<DangKyForm />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </main>
      </Router>
    </ToastProvider>
  );
}

export default App;
