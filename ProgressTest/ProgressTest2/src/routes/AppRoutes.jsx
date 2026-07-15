import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import { useAuth } from '../contexts/AuthContext';

const AppRoutes = () => {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/home" />} />
            <Route path="/home" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
    );
};

export default AppRoutes;
