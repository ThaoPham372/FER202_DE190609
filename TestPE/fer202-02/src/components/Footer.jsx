import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    // py-3 để tạo khoảng cách trên dưới, border-top để có đường kẻ mờ ở trên
    <footer className="py-3 border-top bg-light mt-auto">
      <Container>
        {/* d-flex và justify-content-between giúp đẩy 2 khối text về 2 đầu trái - phải */}
        <div className="d-flex justify-content-between align-items-center text-muted small">
          {/* Bên trái: Copyright */}
          <div>© 2025 PersonalBudget Demo</div>

          {/* Bên phải: Technology Stack */}
          <div>Built with React, Redux Toolkit & JSON Server</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
