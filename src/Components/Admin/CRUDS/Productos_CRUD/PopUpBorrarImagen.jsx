import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteImagen } from '../../../../Functions/ProductosFunctions'

import { PiXCircleDuotone } from 'react-icons/pi'

const PopUpBorrarImagen = ({ imagen, onImagenUpdated, closePopUp }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteImagen(imagen.id)
      console.log('Imagen eliminada', response)
    } catch (e) {
      alert('Hubo un problema al eliminar la imagen.')
      return e.message
    }
    onImagenUpdated()
    setLoading(false)
    closePopUp()
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 bg-secondary-subtle border-0" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          <PiXCircleDuotone className="me-2 text-danger" />
          Borrar imagen
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Está seguro que desea borrar esa imagen?</p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="secondary"
          className="border-0 bg-gradient"
          onClick={() => closePopUp()}
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          className="border-0 bg-gradient"
          onClick={() => handleDelete()}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            'Borrar'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpBorrarImagen
