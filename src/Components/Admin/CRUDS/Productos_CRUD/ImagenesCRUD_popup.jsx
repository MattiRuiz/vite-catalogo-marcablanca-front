import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ImagenesCRUD_popup = ({ closePopUp }) => {
  return (
    <Modal show={true} onHide={closePopUp}>
      <Modal.Header closeButton>
        <Modal.Title>Editar imágenes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Inserte aqui el contenido de este modal</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button>Guardar Cambios(?)</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ImagenesCRUD_popup
