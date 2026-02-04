import React, { useMemo, useReducer, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';
import { initialRegisterState, registerReducer } from '../reducers/registerReducer';
import { isNonEmptyString, isZipValid } from '../utils/validators';
import CommonModal from './CommonModal';

function DangKyForm() {
  const [state, dispatch] = useReducer(registerReducer, initialRegisterState);
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [registeredSnapshot, setRegisteredSnapshot] = useState(null);

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!isNonEmptyString(state.firstName)) nextErrors.firstName = 'Vui lòng nhập First name.';
    if (!isNonEmptyString(state.lastName)) nextErrors.lastName = 'Vui lòng nhập Last name.';
    if (!isNonEmptyString(state.username)) nextErrors.username = 'Vui lòng nhập Username.';
    if (!isNonEmptyString(state.city)) nextErrors.city = 'Vui lòng nhập City.';
    if (!isNonEmptyString(state.state)) nextErrors.state = 'Vui lòng nhập State.';
    if (!isZipValid(state.zip)) nextErrors.zip = 'Zip phải là số (5-10 chữ số).';
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
        firstName: state.firstName,
        lastName: state.lastName,
        username: state.username,
        city: state.city,
        state: state.state,
        zip: state.zip,
      };
      setRegisteredSnapshot(snapshot);
      setShowModal(true);
      showToast('Đã đăng ký thành công!', 'success');
    }
  };

  return (
    <Container className="mb-5">
      <h2 className="mb-3">Đăng Ký Form</h2>
      <Form noValidate onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              value={state.firstName}
              onChange={(e) =>
                dispatch({ type: 'field_change', field: 'firstName', value: e.target.value })
              }
              isValid={showValidation && !errors.firstName}
              isInvalid={showValidation && !!errors.firstName}
              placeholder="Mark"
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              value={state.lastName}
              onChange={(e) =>
                dispatch({ type: 'field_change', field: 'lastName', value: e.target.value })
              }
              isValid={showValidation && !errors.lastName}
              isInvalid={showValidation && !!errors.lastName}
              placeholder="Otto"
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: 'field_change', field: 'username', value: e.target.value })
              }
              isValid={showValidation && !errors.username}
              isInvalid={showValidation && !!errors.username}
              placeholder="Username"
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={state.city}
              onChange={(e) => dispatch({ type: 'field_change', field: 'city', value: e.target.value })}
              isValid={showValidation && !errors.city}
              isInvalid={showValidation && !!errors.city}
              placeholder="City"
            />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              value={state.state}
              onChange={(e) =>
                dispatch({ type: 'field_change', field: 'state', value: e.target.value })
              }
              isValid={showValidation && !errors.state}
              isInvalid={showValidation && !!errors.state}
              placeholder="State"
            />
            <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="zip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              value={state.zip}
              onChange={(e) => dispatch({ type: 'field_change', field: 'zip', value: e.target.value })}
              isValid={showValidation && !errors.zip}
              isInvalid={showValidation && !!errors.zip}
              placeholder="Zip"
            />
            <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
          </Form.Group>
        </Row>

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

        <Button type="submit">Submit form</Button>
      </Form>

      <CommonModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setRegisteredSnapshot(null);
          dispatch({ type: 'reset' });
        }}
        title="Đăng ký thành công"
      >
        {registeredSnapshot ? (
          <div>
            <p className="mb-2">Thông tin đã đăng ký:</p>
            <ul className="mb-0">
              <li>
                <strong>First name:</strong> {registeredSnapshot.firstName}
              </li>
              <li>
                <strong>Last name:</strong> {registeredSnapshot.lastName}
              </li>
              <li>
                <strong>Username:</strong> {registeredSnapshot.username}
              </li>
              <li>
                <strong>City:</strong> {registeredSnapshot.city}
              </li>
              <li>
                <strong>State:</strong> {registeredSnapshot.state}
              </li>
              <li>
                <strong>Zip:</strong> {registeredSnapshot.zip}
              </li>
            </ul>
          </div>
        ) : null}
      </CommonModal>
    </Container>
  );
}

export default DangKyForm;

