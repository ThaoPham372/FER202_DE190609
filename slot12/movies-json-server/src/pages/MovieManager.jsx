import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import FilterBar from '../components/FilterBar';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import { useAuth } from '../contexts/AuthContext';
import { MovieProvider } from '../contexts/MovieContext';

const MovieManagerContent = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-enhanced mb-4">
        <Container>
          <Navbar.Brand style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            🎬 Quản lý Phim
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Navbar.Text className="me-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                👤 Welcome, <strong>{user?.username}</strong> <span style={{ opacity: 0.7 }}>({user?.role})</span>
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={logout} className="btn-enhanced">
                🚪 Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="fade-in">
        <h1 className="page-title">🎬 Quản lý Phim</h1>
        <MovieForm />
        <FilterBar />
        <h2 className="subtitle">📋 Danh sách Phim</h2>
        <MovieTable />
      </Container>
    </>
  );
};

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;

