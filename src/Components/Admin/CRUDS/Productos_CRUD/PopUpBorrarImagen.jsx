import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteImagen } from '../../../../Functions/ProductosFunctions'

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
      <Modal.Header className="bg-danger text-white border-0" closeButton>
        <Modal.Title>Borrar imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Está seguro que desea borrar esa imagen?</p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button
          variant="danger"
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
