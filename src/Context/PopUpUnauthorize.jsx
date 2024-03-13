import { Modal, Button } from 'react-bootstrap'

const PopUpUnauthorize = ({ closePopUp }) => {
  return (
    <Modal
      className="border-0 bg-danger text-white"
      show={true}
      onHide={closePopUp}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Su cuenta expiró</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Por favor inicie sesión nuevamente.</p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpUnauthorize
