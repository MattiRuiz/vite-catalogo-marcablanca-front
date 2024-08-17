import { Modal, Button } from 'react-bootstrap'

const PopUpForgotPassword = ({ closePopUp }) => {
  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          ¿Olvidaste tu contraseña?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="">
          Para garantizar la seguridad de tu cuenta, te pedimos que te acerques
          a nuestro establecimiento con los <strong>datos de tu cuenta.</strong>{' '}
          De esta manera, podremos restablecer tu contraseña manualmente.
        </p>
      </Modal.Body>
      {/* <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cerrar
        </Button>
      </Modal.Footer> */}
    </Modal>
  )
}

export default PopUpForgotPassword
