import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteTipoProducto } from '../../../../Functions/TipoProductosFunctions'

const PopUpBorrarTipoProducto = ({
  tipoProducto,
  onTipoProductoUpdated,
  closePopUp,
}) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (idTipoProducto) => {
    setLoading(true)
    try {
      const response = await deleteTipoProducto(idTipoProducto)
      console.log('Tipo producto eliminado', response)
    } catch (e) {
      alert('Hubo un problema al eliminar el tipo de producto.')
      return e.message
    }
    onTipoProductoUpdated()
    setLoading(false)
    closePopUp()
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header closeButton>
        <Modal.Title>Borrar tipo de producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el tipo de producto{' '}
          <strong>{tipoProducto.nombre}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleDelete(tipoProducto.id)}>
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

export default PopUpBorrarTipoProducto
