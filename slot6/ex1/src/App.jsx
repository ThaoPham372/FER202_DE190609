import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminNavbar from './components/NavbarSearch.jsx'
import Login from './components/Login.jsx'
import ManageUsers from './components/ManageUsers.jsx'
import BookingForm from './components/BookingForm.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="app-root-full">
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<Navigate to="/booking" replace />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<ManageUsers />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
