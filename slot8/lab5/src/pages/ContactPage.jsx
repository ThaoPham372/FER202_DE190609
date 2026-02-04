import React, { useMemo, useReducer, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import CommonModal from '../components/CommonModal';
import { useToast } from '../context/ToastContext';
import { contactReducer, initialContactState } from '../reducers/contactReducer';
import { isEmailValid, isNonEmptyString, isPhoneValid } from '../utils/validators';

function ContactPage() {
  const [state, dispatch] = useReducer(contactReducer, initialContactState);
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [contactSnapshot, setContactSnapshot] = useState(null);

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!isNonEmptyString(state.fullName)) nextErrors.fullName = 'Vui lòng nhập họ tên.';
    if (!isEmailValid(state.email)) nextErrors.email = 'Email không hợp lệ.';
    if (!isPhoneValid(state.phone)) nextErrors.phone = 'Số điện thoại không hợp lệ.';
    if (!isNonEmptyString(state.subject)) nextErrors.subject = 'Vui lòng nhập tiêu đề.';
    if (!isNonEmptyString(state.message)) nextErrors.message = 'Vui lòng nhập nội dung.';
    if (!state.agree) nextErrors.agree = 'Bạn cần đồng ý điều khoản trước khi submit.';

    return nextErrors;
  }, [state]);

  const isValid = Object.keys(errors).length === 0;
  const showValidation = state.submitted;

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'submit' });

    if (isValid) {
      const snapshot = {
        fullName: state.fullName,
        email: state.email,
        phone: state.phone,
        subject: state.subject,
        message: state.message,
      };
      setContactSnapshot(snapshot);
      setShowModal(true);
      showToast('Gửi liên hệ thành công!', 'success');
    }
  };

  return (
    <Container className="py-3">
      <h2 className="my-4">Contact</h2>

      <Form noValidate onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="fullName">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              value={state.fullName}
              onChange={(e) =>
                dispatch({ type: 'field_change', field: 'fullName', value: e.target.value })
              }
              isValid={showValidation && !errors.fullName}
              isInvalid={showValidation && !!errors.fullName}
              placeholder="Nguyễn Văn A"
            />
            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: 'field_change', field: 'email', value: e.target.value })
              }
              isValid={showValidation && !errors.email}
              isInvalid={showValidation && !!errors.email}
              placeholder="email@example.com"
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="phone">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              value={state.phone}
              onChange={(e) =>
                dispatch({ type: 'field_change', field: 'phone', value: e.target.value })
              }
              isValid={showValidation && !errors.phone}
              isInvalid={showValidation && !!errors.phone}
              placeholder="0901234567"
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="subject">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              value={state.subject}
              onChange={(e) =>
                dispatch({ type: 'field_change', field: 'subject', value: e.target.value })
              }
              isValid={showValidation && !errors.subject}
              isInvalid={showValidation && !!errors.subject}
              placeholder="Tư vấn đặt pizza"
            />
            <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={state.message}
            onChange={(e) => dispatch({ type: 'field_change', field: 'message', value: e.target.value })}
            isValid={showValidation && !errors.message}
            isInvalid={showValidation && !!errors.message}
            placeholder="Nhập nội dung liên hệ..."
          />
          <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="agree">
          <Form.Check
            type="checkbox"
            label="Agree to terms and conditions"
            checked={state.agree}
            onChange={() => dispatch({ type: 'toggle_agree' })}
            isInvalid={showValidation && !!errors.agree}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>

      <CommonModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setContactSnapshot(null);
          dispatch({ type: 'reset' });
        }}
        title="Gửi liên hệ thành công"
      >
        {contactSnapshot ? (
          <div>
            <p className="mb-2">Thông tin liên hệ:</p>
            <ul className="mb-3">
              <li>
                <strong>Họ tên:</strong> {contactSnapshot.fullName}
              </li>
              <li>
                <strong>Email:</strong> {contactSnapshot.email}
              </li>
              <li>
                <strong>SĐT:</strong> {contactSnapshot.phone}
              </li>
              <li>
                <strong>Tiêu đề:</strong> {contactSnapshot.subject}
              </li>
            </ul>
            <div>
              <strong>Nội dung:</strong>
              <div className="mt-2 p-2 rounded" style={{ background: '#f3f4f6' }}>
                {contactSnapshot.message}
              </div>
            </div>
          </div>
        ) : null}
      </CommonModal>
    </Container>
  );
}

export default ContactPage;

