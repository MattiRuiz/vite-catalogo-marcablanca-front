import { Modal, Spinner } from 'react-bootstrap'
import { Boton } from '../ui'

function PopUp({
  children,
  header,
  closePopUp,
  buttonLabel,
  onAction,
  loading = false,
}) {
  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 bg-secondary-subtle border-0" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {buttonLabel && (
        <Modal.Footer className="border-0 pt-0">
          <Boton variant="secondary" onClick={closePopUp}>
            Cancelar
          </Boton>
          <Boton variant="danger" onClick={onAction} disabled={loading}>
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              buttonLabel
            )}
          </Boton>
        </Modal.Footer>
      )}
    </Modal>
  )
}

export default PopUp
