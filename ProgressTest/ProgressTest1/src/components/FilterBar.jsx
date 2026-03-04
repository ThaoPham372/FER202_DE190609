import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ search, setSearch, role, setRole, status, setStatus, sort, setSort }) => {
  return (
    <Row className="mb-3 g-2 align-items-center">
      <Col xs={12} md={4}>
        <Form.Control
          type="text"
          placeholder="Search by username or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col xs="auto">
        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="All">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>
      <Col xs="auto">
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </Form.Select>
      </Col>
      <Col xs="auto">
        <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="username_asc">Username A→Z</option>
          <option value="username_desc">Username Z→A</option>
          <option value="role_admin">Role: Admin first</option>
          <option value="role_user">Role: User first</option>
          <option value="status_active">Status: Active first</option>
          <option value="status_locked">Status: Locked first</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default FilterBar;
