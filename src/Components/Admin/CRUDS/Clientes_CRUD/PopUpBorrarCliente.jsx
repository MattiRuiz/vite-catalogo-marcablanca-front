import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteCliente } from '../../../../Functions/ClienteFunctions'

const PopUpBorrarCliente = ({ cliente, onClienteUpdated, closePopUp }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (idCliente) => {
    setLoading(true)
    try {
      const response = await deleteCliente(idCliente)
      console.log('Cliente eliminado', response)
    } catch (e) {
      alert('Hubo un problema al eliminar un cliente.')
      return e.message
    }
    onClienteUpdated()
    setLoading(false)
    closePopUp()
  }
  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header closeButton>
        <Modal.Title>Borrar cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el usuario{' '}
          <strong>{cliente.username}</strong> del cliente{' '}
          <strong>
            {cliente.clientes.nombre} {cliente.clientes.apellido}
          </strong>
          ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleDelete(cliente.id)}>
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

export default PopUpBorrarCliente
