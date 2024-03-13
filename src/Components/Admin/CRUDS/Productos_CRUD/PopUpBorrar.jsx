import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteProducto } from '../../../../Functions/ProductosFunctions'

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
      <Modal.Header className="bg-danger text-white border-0" closeButton>
        <Modal.Title>Borrar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el producto{' '}
          <strong>{producto.nombre}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleDelete(producto.id)}>
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
