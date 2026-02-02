import { useReducer, useState } from 'react'
import { Alert, Button, Card, Form, Stack } from 'react-bootstrap'

const initialState = {
  name: '',
  price: '',
  category: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { ...state, [action.field]: action.value }
    case 'RESET_FORM':
      return initialState
    default:
      return state
  }
}

export default function ProductForm2() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'CHANGE_INPUT', field: name, value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', state)
    const message = `Sản phẩm đã được thêm:\nTên: ${state.name}\nGiá: ${state.price}\nDanh mục: ${state.category}`
    setAlertMessage(message)
    setShowAlert(true)
    dispatch({ type: 'RESET_FORM' })
    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

  return (
    <Stack gap={3} className="mt-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          <Alert.Heading>Thành công!</Alert.Heading>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{alertMessage}</pre>
        </Alert>
      )}
      
      <Card>
        <Card.Header>
          <Card.Title>Thêm sản phẩm mới</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Stack gap={3}>
              <Form.Group controlId="productName">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm"
                  required
                />
              </Form.Group>

              <Form.Group controlId="productPrice">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={state.price}
                  onChange={handleChange}
                  placeholder="Nhập giá sản phẩm"
                  min="0"
                  required
                />
              </Form.Group>

              <Form.Group controlId="productCategory">
                <Form.Label>Danh mục</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={state.category}
                  onChange={handleChange}
                  placeholder="Nhập danh mục"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Thêm sản phẩm
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Stack>
  )
}
