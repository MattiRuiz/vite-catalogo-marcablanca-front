import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const PopUpForgotPassword = ({ closePopUp }) => {
  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="bg-primario text-white border-0" closeButton>
        <Modal.Title>¿Olvidaste tu contraseña?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">
          Para garantizar la seguridad de tu cuenta, te pedimos que te acerques
          a nuestro establecimiento con los <strong>datos de tu cuenta.</strong>{' '}
          De esta manera, podremos restablecer tu contraseña manualmente y
          asegurarnos de que solo tú tengas acceso.
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpForgotPassword
