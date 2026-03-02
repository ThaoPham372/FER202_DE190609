import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';

const FilterBar = () => {
  const { genres, filters } = useMovieState();
  const { dispatch } = useMovieDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FILTERS', payload: { [name]: value } });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  return (
    <div className="filter-bar-enhanced fade-in">
      <Form>
        <Row className="gy-3 align-items-end">
          <Col md={4}>
            <Form.Group controlId="filterSearch">
              <Form.Label>🔍 Tìm kiếm theo tên / mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên phim..."
                name="search"
                value={filters.search}
                onChange={handleChange}
                className="form-control-enhanced"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="filterGenre">
              <Form.Label>🎭 Thể loại</Form.Label>
              <Form.Select
                name="genreId"
                value={filters.genreId}
                onChange={handleChange}
                className="form-control-enhanced"
              >
                <option value="">Tất cả</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="filterMinDuration">
              <Form.Label>⏱️ Thời lượng từ (phút)</Form.Label>
              <Form.Control
                type="number"
                name="minDuration"
                value={filters.minDuration}
                onChange={handleChange}
                className="form-control-enhanced"
                placeholder="Min"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="filterMaxDuration">
              <Form.Label>⏱️ Đến (phút)</Form.Label>
              <Form.Control
                type="number"
                name="maxDuration"
                value={filters.maxDuration}
                onChange={handleChange}
                className="form-control-enhanced"
                placeholder="Max"
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group controlId="filterSort">
              <Form.Label>📊 Sắp xếp</Form.Label>
              <Form.Select
                name="sort"
                value={filters.sort}
                onChange={handleChange}
                className="form-control-enhanced"
              >
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="outline-secondary" size="sm" onClick={handleReset} className="btn-enhanced">
              🗑️ Xóa bộ lọc
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FilterBar;

