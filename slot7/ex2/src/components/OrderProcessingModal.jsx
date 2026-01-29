import { useState } from 'react'
import { Alert, Button, Modal, Stack } from 'react-bootstrap'

export default function OrderProcessingModal() {
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const handleOpen = () => setIsShowModal(true)
  const handleClose = () => setIsShowModal(false)

  const handleConfirm = () => {
    handleClose()
    setIsShowConfirmModal(true)
  }

  const handleConfirmFinal = () => {
    setIsShowConfirmModal(false)
    setShowSuccessAlert(true)
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 3000)
  }

  const handleCancelConfirm = () => {
    setIsShowConfirmModal(false)
  }

  return (
    <Stack className="mt-3" gap={2}>
      <Button variant="primary" onClick={handleOpen}>
        Xử lý đơn hàng
      </Button>

      {showSuccessAlert && (
        <Alert variant="success" dismissible onClose={() => setShowSuccessAlert(false)}>
          Duyệt đơn hàng thành công!
        </Alert>
      )}

      <Modal show={isShowModal} onHide={handleClose} centered>
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

      <Modal show={isShowConfirmModal} onHide={handleCancelConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelConfirm}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmFinal}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  )
}

