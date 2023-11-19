import { useState, useEffect } from 'react'
import {
  getAllClientes,
  deleteCliente,
} from '../../../Functions/ClienteFunctions'
import ClientesPopup from './ClientesCRUD_popup'
import { Col, Button, Accordion } from 'react-bootstrap'

const ClientesCRUD = () => {
  //#region Declaracion useState's
  const [clientes, setClientes] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const clientesResponse = await getAllClientes()
      setClientes(clientesResponse.data)
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  //#endregion

  const openPopup = (cliente) => {
    setSelectedCliente(cliente)
    setPopUp(true)
  }
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idCliente) => {
    try {
      const response = await deleteCliente(idCliente)
      console.log('Usuario eliminado', response)
      setPopUp(false)
    } catch (e) {
      return e.message
    }
    fetchData()
  }
  //#endregion

  return (
    <>
      <Col xs={12}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear cliente
        </Button>
        <Accordion className="mt-3">
          {clientes.map((cliente) => (
            <Accordion.Item eventKey={cliente.id} key={cliente.id}>
              <Accordion.Header>
                <ul className="list-unstyled my-0">
                  <li className="mb-1">
                    <strong>User:</strong> {cliente.username}
                  </li>
                  <li>
                    <strong>Nombre:</strong> {cliente.clientes.nombre}{' '}
                    {cliente.clientes.apellido}
                  </li>
                </ul>
              </Accordion.Header>
              <Accordion.Body>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(cliente)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(cliente.id)}
                >
                  Borrar
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Col>
      {
        //#region Renderizado condicional PopUp
        popUp ? (
          <ClientesPopup
            cliente={selectedCliente}
            onClienteUpdated={() => fetchData()}
            closePopUp={() => setPopUp(false)}
          />
        ) : (
          <></>
        )
        //#endregion
      }
    </>
  )
}

export default ClientesCRUD
