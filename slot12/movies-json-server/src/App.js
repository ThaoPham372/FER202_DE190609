import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MovieManager from './pages/MovieManager';

// Component để kiểm tra authentication và hiển thị nội dung phù hợp
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <MovieManager />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
