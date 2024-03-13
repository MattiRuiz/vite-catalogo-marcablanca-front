import { Modal, Button } from 'react-bootstrap'

const PopUpUnauthorize = ({ closePopUp }) => {
  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header closeButton>
        <Modal.Title>Su cuenta expiró</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Por favor inicie sesión nuevamente.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpUnauthorize
