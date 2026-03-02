import React from 'react';
import { Alert, Button, Image, Modal, Spinner, Table } from 'react-bootstrap';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';

const applyFilters = (movies, filters) => {
  const { search, genreId, minDuration, maxDuration, sort } = filters;
  let result = [...movies];

  if (search.trim()) {
    const lower = search.toLowerCase();
    result = result.filter(
      (m) =>
        m.title.toLowerCase().includes(lower) ||
        m.description.toLowerCase().includes(lower)
    );
  }

  if (genreId) {
    const gid = parseInt(genreId, 10);
    result = result.filter((m) => m.genreId === gid);
  }

  if (minDuration) {
    const min = parseInt(minDuration, 10);
    result = result.filter((m) => m.duration >= min);
  }

  if (maxDuration) {
    const max = parseInt(maxDuration, 10);
    result = result.filter((m) => m.duration <= max);
  }

  result.sort((a, b) => {
    if (a.title === b.title) return 0;
    return sort === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  return result;
};

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, genres, loading, movieToDelete, showDeleteModal, filters } =
    state;

  const genreMap = genres.reduce((map, genre) => {
    // eslint-disable-next-line no-param-reassign
    map[genre.id] = genre.name;
    return map;
  }, {});

  const filteredMovies = applyFilters(movies, filters);

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="loading-container fade-in">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <Alert variant="info" className="mt-3" style={{ borderRadius: '12px', border: 'none' }}>
            <strong>⏳</strong> Đang tải dữ liệu phim...
          </Alert>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="empty-state fade-in">
          <div className="empty-state-icon">🎬</div>
          <div className="empty-state-text">
            Không tìm thấy phim nào phù hợp với bộ lọc của bạn.
          </div>
        </div>
      ) : (
        <div className="table-enhanced fade-in" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Table striped bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th>🖼️ Avatar</th>
                <th># ID</th>
                <th>📽️ Tên Phim</th>
                <th>🎭 Danh mục</th>
                <th>⏱️ Thời lượng</th>
                <th>⚙️ Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <Image
                      src={movie.avatar}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                      thumbnail
                    />
                  </td>
                  <td style={{ fontWeight: 600, color: '#667eea' }}>#{movie.id}</td>
                  <td>
                    <strong style={{ color: '#2d3748' }}>{movie.title}</strong>
                    <br />
                    <small style={{ color: '#718096' }}>({movie.year})</small>
                  </td>
                  <td>
                    <span className="badge-enhanced badge bg-primary">
                      {genreMap[movie.genreId] || 'Unknown'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{movie.duration} phút</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie })
                      }
                      className="me-2 btn-enhanced"
                    >
                      ✏️ Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie })
                      }
                      className="btn-enhanced"
                    >
                      🗑️ Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal
        show={showDeleteModal}
        onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}
        centered
      >
        <Modal.Header style={{ background: 'linear-gradient(135deg, #f56565 0%, #c53030 100%)', color: 'white', borderRadius: '16px 16px 0 0', border: 'none' }}>
          <Modal.Title style={{ fontWeight: 700, fontSize: '1.5rem' }}>⚠️ Xác nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem' }}>
          <div className="text-center mb-3">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗑️</div>
            <p style={{ fontSize: '1.1rem', color: '#2d3748' }}>
              Bạn có chắc chắn muốn xóa phim
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#c53030', marginTop: '0.5rem' }}>
              "{movieToDelete?.title}"
            </p>
            <p style={{ fontSize: '0.95rem', color: '#718096', marginTop: '0.5rem' }}>
              Hành động này không thể hoàn tác!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: 'none', padding: '1.5rem' }}>
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}
            className="btn-enhanced"
          >
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              const movieId = movieToDelete?.id;
              console.log('=== DELETE DEBUG ===');
              console.log('Movie to delete:', movieToDelete);
              console.log('Movie ID (raw):', movieId, 'Type:', typeof movieId);
              
              if (movieId !== null && movieId !== undefined && movieId !== '') {
                // Đảm bảo ID được convert sang string
                const idToDelete = String(movieId).trim();
                console.log('Deleting with ID:', idToDelete, 'Type:', typeof idToDelete);
                console.log('API URL will be:', `/movies/${idToDelete}`);
                confirmDelete(idToDelete);
              } else {
                console.error('Movie ID is missing or invalid:', movieId);
                alert('Không thể xóa phim: ID không hợp lệ');
              }
            }}
            className="btn-enhanced"
          >
            🗑️ Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;

