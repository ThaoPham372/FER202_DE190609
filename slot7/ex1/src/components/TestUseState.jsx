import { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

export default function TestUseState() {
  const [usernameInput, setUsernameInput] = useState('')
  const [ageInput, setAgeInput] = useState('')

  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername(usernameInput)
    setAge(ageInput)
    setSubmitted(true)
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row className="align-items-center mb-3">
                  <Col xs={12} md={4}>
                    <Form.Label className="fw-semibold mb-md-0">Username</Form.Label>
                  </Col>
                  <Col xs={12} md={8}>
                    <Form.Control
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="Enter username"
                    />
                  </Col>
                </Row>

                <Row className="align-items-center mb-3">
                  <Col xs={12} md={4}>
                    <Form.Label className="fw-semibold mb-md-0">Age</Form.Label>
                  </Col>
                  <Col xs={12} md={8}>
                    <Form.Control
                      type="number"
                      value={ageInput}
                      onChange={(e) => setAgeInput(e.target.value)}
                      placeholder="Enter age"
                      min={0}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={12}>
                    <Button type="submit" className="w-100 fw-semibold" variant="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>

                {submitted && (
                  <Row className="align-items-center">
                    <Col xs={12} md={4}>
                      <Form.Label className="fw-semibold mb-md-0">Message</Form.Label>
                    </Col>
                    <Col xs={12} md={8}>
                      <Form.Control
                        plaintext
                        readOnly
                        className="fw-semibold text-primary"
                        value={`Hello, ${username}, age ${age}`}
                      />
                    </Col>
                  </Row>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
