import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteTallaProducto } from '../../../../Functions/TallasProductosFunctions'

const PopUpBorrarTallaProducto = ({
  talla,
  producto,
  onDataUpdated,
  closePopUp,
}) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteTallaProducto(talla.id)
      console.log('Talla producto eliminada', response)
    } catch (e) {
      alert('Hubo un problema al eliminar la medida del producto.')
      return e.message
    }
    onDataUpdated()
    setLoading(false)
    closePopUp()
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="bg-danger text-white border-0" closeButton>
        <Modal.Title>Borrar medida de un producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar la medida{' '}
          <strong>{talla.tallas.nombre}</strong> del producto{' '}
          <strong>{producto.nombre}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleDelete()}>
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

export default PopUpBorrarTallaProducto
