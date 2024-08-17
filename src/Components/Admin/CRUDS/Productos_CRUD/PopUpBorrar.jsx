import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteProducto } from '../../../../Functions/ProductosFunctions'

import { PiXCircleDuotone } from 'react-icons/pi'

const PopUpBorrar = ({ producto, onProductoUpdated, closePopUp }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (idProducto) => {
    setLoading(true)
    try {
      const response = await deleteProducto(idProducto)
      console.log('Producto eliminado', response)
    } catch (e) {
      alert('Hubo un problema al eliminar un producto.')
      return e.message
    }
    onProductoUpdated()
    setLoading(false)
    closePopUp()
  }
  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 bg-secondary-subtle border-0" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          <PiXCircleDuotone className="me-2 text-danger" />
          Borrar producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el producto{' '}
          <strong>{producto.nombre}</strong>?
        </p>
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
          onClick={() => handleDelete(producto.id)}
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

export default PopUpBorrar
