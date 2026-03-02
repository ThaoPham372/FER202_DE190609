import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';

// Fallback genres dùng khi chưa load được từ server,
// giúp thanh chọn thể loại luôn có sẵn các lựa chọn.
const defaultGenres = [
  { id: 1, name: 'Sci-Fi' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
  { id: 4, name: 'Horror' },
  { id: 5, name: 'Romance' },
  { id: 6, name: 'Action' },
  { id: 7, name: 'Thriller' },
];

const MovieFields = ({
  currentMovie,
  handleInputChange,
  handleFileChange,
  imagePreview,
  genres,
  errors = {},
  validated = false,
}) => {
  const options = genres && genres.length > 0 ? genres : defaultGenres;

  return (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh Avatar Phim</Form.Label>
          <Form.Control
            type="file"
            name="avatarFile"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 form-control-enhanced"
          />
          <Form.Control
            type="text"
            name="avatar"
            value={currentMovie.avatar || ''}
            onChange={handleInputChange}
            placeholder="Hoặc nhập URL hình ảnh"
            isInvalid={validated && errors.avatar}
            className="form-control-enhanced"
          />
          <Form.Control.Feedback type="invalid">
            {errors.avatar}
          </Form.Control.Feedback>
          {imagePreview && (
            <div className="mt-3 image-preview-container" style={{ display: 'inline-block' }}>
              <Image
                src={imagePreview}
                alt="Preview"
                thumbnail
                style={{ maxWidth: '200px', maxHeight: '150px', display: 'block' }}
              />
            </div>
          )}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formTitle">
          <Form.Label>
            Tên Phim <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={currentMovie.title || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.title}
            className="form-control-enhanced"
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={12}>
        <Form.Group controlId="formDescription">
          <Form.Label>
            Mô tả <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={currentMovie.description || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.description}
            className="form-control-enhanced"
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formGenre">
          <Form.Label>
            Thể loại <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="genreId"
            value={currentMovie.genreId || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.genreId}
            className="form-control-enhanced"
          >
            <option value="">Chọn thể loại</option>
            {options.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.genreId}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>
            Thời lượng (phút) <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={currentMovie.duration || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.duration}
            className="form-control-enhanced"
          />
          <Form.Control.Feedback type="invalid">
            {errors.duration}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group controlId="formYear">
          <Form.Label>
            Năm <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={currentMovie.year || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.year}
            className="form-control-enhanced"
          />
          <Form.Control.Feedback type="invalid">
            {errors.year}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group controlId="formCountry">
          <Form.Label>
            Quốc gia <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={currentMovie.country || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.country}
            className="form-control-enhanced"
          />
          <Form.Control.Feedback type="invalid">
            {errors.country}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  </>
);
};

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal, genres, movies } = state;

  const [imagePreview, setImagePreview] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const finalValue =
      name === 'genreId'
        ? value === ''
          ? ''
          : Number(value)
        : value;

    dispatch({ type: 'UPDATE_FIELD', payload: { name, value: finalValue } });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        dispatch({
          type: 'UPDATE_FIELD',
          payload: { name: 'avatar', value: event.target.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentMovie.title?.trim())
      newErrors.title = 'Tên phim không được để trống';
    if (!currentMovie.description?.trim())
      newErrors.description = 'Mô tả không được để trống';
    if (!currentMovie.genreId)
      newErrors.genreId = 'Vui lòng chọn thể loại';
    if (!currentMovie.duration || currentMovie.duration < 1)
      newErrors.duration = 'Thời lượng không hợp lệ';
    if (!currentMovie.year || currentMovie.year < 1900)
      newErrors.year = 'Năm không hợp lệ';
    if (!currentMovie.country?.trim())
      newErrors.country = 'Quốc gia không được để trống';
    if (!currentMovie.avatar?.trim())
      newErrors.avatar = 'Vui lòng chọn ảnh';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (!validateForm()) return;

    let dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration, 10),
      year: parseInt(currentMovie.year, 10),
      genreId: parseInt(currentMovie.genreId, 10),
    };

    // Nếu là thêm mới, tự động tăng id theo số thứ tự
    if (isEditing === null) {
      const maxId = movies.reduce((max, m) => {
        // Xử lý cả ID dạng số và string
        const idValue = typeof m.id === 'string' ? parseInt(m.id, 10) : m.id;
        const n = typeof idValue === 'number' && !isNaN(idValue) ? idValue : 0;
        return n > max ? n : max;
      }, 0);
      const nextId = maxId + 1;
      // Đảm bảo ID là string để nhất quán với json-server
      dataToSend = { ...dataToSend, id: String(nextId) };
    } else {
      // Khi update, đảm bảo ID được giữ lại và đúng kiểu (string)
      const movieId = isEditing || currentMovie.id;
      if (movieId) {
        // Convert sang string để nhất quán
        dataToSend = { ...dataToSend, id: String(movieId) };
      }
    }

    const success = await handleCreateOrUpdate(
      dataToSend,
      isEditing !== null,
      isEditing || currentMovie.id
    );
    if (success) {
      // Reset trạng thái validate + lỗi để form không bị đỏ sau khi thao tác xong
      setValidated(false);
      setErrors({});

      if (isEditing === null) {
        setImagePreview('');
      } else {
        dispatch({ type: 'CLOSE_EDIT_MODAL' });
      }
    }
  };

  // Khi mở modal sửa phim, đảm bảo form không hiển thị lỗi đỏ sẵn
  useEffect(() => {
    if (showEditModal) {
      setValidated(false);
      setErrors({});
    }
  }, [showEditModal]);

  return (
    <>
      <div className="professional-card form-card mb-4 fade-in">
        <div style={{ padding: '2rem' }}>
          <h3 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
            📽️ Thêm Phim Mới
          </h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <MovieFields
              currentMovie={currentMovie}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              imagePreview={imagePreview}
              genres={genres}
              errors={errors}
              validated={validated}
            />
            <div className="d-grid gap-2 mt-4">
              <Button variant="success" type="submit" className="btn-enhanced" size="lg">
                ➕ Thêm Phim
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <Modal
        show={showEditModal}
        onHide={() => dispatch({ type: 'CLOSE_EDIT_MODAL' })}
        size="lg"
        centered
      >
        <Modal.Header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '16px 16px 0 0', border: 'none' }}>
          <Modal.Title style={{ fontWeight: 700, fontSize: '1.5rem' }}>✏️ Chỉnh sửa Phim</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body style={{ padding: '2rem' }}>
            <MovieFields
              currentMovie={currentMovie}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              imagePreview={currentMovie.avatar}
              genres={genres}
              errors={errors}
              validated={validated}
            />
          </Modal.Body>
          <Modal.Footer style={{ border: 'none', padding: '1.5rem' }}>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch({ type: 'RESET_FORM' });
                setErrors({});
                setValidated(false);
              }}
              className="btn-enhanced"
            >
              Hủy
            </Button>
            <Button variant="warning" type="submit" className="btn-enhanced">
              💾 Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;

