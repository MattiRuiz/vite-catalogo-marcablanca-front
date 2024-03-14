import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const PopUpForgotPassword = ({ closePopUp }) => {
  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="bg-primario text-white border-0" closeButton>
        <Modal.Title>¿Olvidaste tu contraseña?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Por una cuestión de seguridad, para poder recuperar su cuenta debe
          dirigirse con su <strong>nombre de usuario a nuestro local</strong>{' '}
          para que podamos reiniciar su contraseña manualmente.
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
