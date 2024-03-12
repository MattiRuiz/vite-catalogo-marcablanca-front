import { useState, useEffect } from 'react'
import { Col, Button, Accordion, Spinner } from 'react-bootstrap'

import {
  getAllClientes,
  deleteCliente,
} from '../../../../Functions/ClienteFunctions'

import ClientesPopup from './ClientesCRUD_popup'
import PopUpBorrarCliente from './PopUpBorrarCliente'

const ClientesCRUD = () => {
  //#region Declaracion useState's
  const [clientes, setClientes] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  //#endregion

  const [loading, setLoading] = useState(false)

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    setLoading(true)
    try {
      const clientesResponse = await getAllClientes()
      setClientes(clientesResponse.data)
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
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

  const openPopUpBorrar = (cliente) => {
    setSelectedCliente(cliente)
    setPopUpBorrar(true)
  }

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
                  onClick={() => openPopUpBorrar(cliente)}
                >
                  Borrar
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        {loading ? (
          <Spinner
            variant="light"
            className="my-5 d-block mx-auto"
            animation="border"
          />
        ) : (
          ''
        )}
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
      {popUpBorrar ? (
        <PopUpBorrarCliente
          cliente={selectedCliente}
          onClienteUpdated={() => fetchData()}
          closePopUp={() => setPopUpBorrar(false)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default ClientesCRUD
