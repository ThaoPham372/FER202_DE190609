import { useReducer } from 'react'
import { Alert, Button, Modal, Stack } from 'react-bootstrap'

const initialState = {
  isShowModal: false,
  isConfirmed: false
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isShowModal: true }
    case 'CLOSE_MODAL':
      return { ...state, isShowModal: false }
    case 'CONFIRM_ORDER':
      return { ...state, isConfirmed: true, isShowModal: false }
    case 'RESET_CONFIRMED':
      return { ...state, isConfirmed: false }
    default:
      return state
  }
}

export default function OrderProcessingModal2() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOpen = () => dispatch({ type: 'OPEN_MODAL' })
  const handleClose = () => dispatch({ type: 'CLOSE_MODAL' })
  const handleConfirm = () => dispatch({ type: 'CONFIRM_ORDER' })
  const handleCloseAlert = () => dispatch({ type: 'RESET_CONFIRMED' })

  return (
    <Stack className="mt-3" gap={2}>
      <Button variant="primary" onClick={handleOpen}>
        Xử lý đơn hàng
      </Button>

      {state.isConfirmed && (
        <Alert variant="success" dismissible onClose={handleCloseAlert}>
          Duyệt đơn hàng thành công!
        </Alert>
      )}

      <Modal show={state.isShowModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xử lý đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn đang chuẩn bị duyệt đơn hàng và chuyển sang bộ phận kho.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  )
}
