import { useState, useEffect } from 'react'
import { Col, Spinner, FormControl } from 'react-bootstrap'

import {
  getAllClientes,
  deleteCliente,
} from '../../../Functions/ClienteFunctions'

import ClientesPopup from './ClientesCRUD_popup'
import ClientesEditor from './ClientesEditor'

import { PiPlusCircleBold } from 'react-icons/pi'

import { PopUp, BotonSecundario } from '../../../ui'

const ClientesCRUD = ({ showToast }) => {
  const [clientes, setClientes] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editor, setEditor] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const clientesResponse = await getAllClientes()
      setClientes(clientesResponse.data)
    } catch (e) {
      showToast(
        'danger',
        'Problema de carga',
        'Hubo un problema al actualizar la información.'
      )
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openPopup = (cliente) => {
    setSelectedCliente(cliente)
    setPopUp(true)
  }

  const openPopUpBorrar = (cliente) => {
    setSelectedCliente(cliente)
    setPopUpBorrar(true)
  }

  const openClienteEditor = (cliente) => {
    setSelectedCliente(cliente)
    setEditor(!editor)
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteCliente(selectedCliente.id)
      showToast(
        'success',
        'Cliente eliminado',
        'El cliente se ha eliminado con éxito.'
      )
      fetchData()
      setPopUpBorrar(false)
    } catch (e) {
      showToast('danger', 'Error', 'Hubo un problema al eliminar el cliente.')
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredClientes = clientes.filter((cliente) =>
    `${cliente.clientes.nombre} ${cliente.clientes.apellido} ${cliente.username}`
      .toLocaleLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Col xs={12}>
        {editor && (
          <ClientesEditor
            cliente={selectedCliente}
            onClienteUpdated={() => fetchData()}
            onClose={() => setEditor(false)}
            showToast={showToast}
          />
        )}
        {!editor && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
              <h2 className="mb-0 fw-bold">Clientes</h2>
              <div className="d-flex">
                <BotonSecundario
                  className="me-2 "
                  onClick={() => openPopup(null)}
                >
                  Añadir <PiPlusCircleBold className="ms-2" />
                </BotonSecundario>
                <FormControl
                  placeholder="Buscar"
                  style={{ maxWidth: '300px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between p-2 bg-dark mt-3 rounded-top text-white">
              <Col xs={1}>
                <p className="mb-0 texto-14 fw-bold">Id</p>
              </Col>
              <Col>
                <p className="mb-0 texto-14 fw-bold">Usuario</p>
              </Col>
              <Col>
                <p className="mb-0 texto-14 fw-bold">Nombre y apellido</p>
              </Col>
              <Col className="text-center">
                <p className="mb-0 texto-14 fw-bold">Suscripción</p>
              </Col>
              <Col className="text-center">
                <p className="mb-0 texto-14 fw-bold">Fecha fin</p>
              </Col>
            </div>
            <div className="bg-white">
              {filteredClientes.map((cliente) => (
                <div
                  key={cliente.id}
                  className="border-bottom d-flex align-items-center justify-content-between p-2"
                >
                  <Col xs={1}>
                    <button
                      className="text-primary fw-semibold bg-transparent"
                      onClick={() => openClienteEditor(cliente)}
                    >
                      {cliente.id}
                    </button>
                  </Col>
                  <Col>{cliente.username}</Col>
                  <Col>
                    {cliente.clientes.nombre} {cliente.clientes.apellido}
                  </Col>
                  <Col className="text-center">
                    {cliente.clientes.subscriptions === null && (
                      <p className="mb-0 text-muted fw-bold">A crear</p>
                    )}
                    {cliente.clientes.subscriptions?.estado === 'active' && (
                      <p className="mb-0 text-success fw-bold">Activa</p>
                    )}
                    {cliente.clientes.subscriptions?.estado === 'expired' && (
                      <p className="mb-0 text-danger fw-bold">Vencida</p>
                    )}
                    {cliente.clientes.subscriptions?.estado === 'canceled' && (
                      <p className="mb-0 text-danger fw-bold">Cancelada</p>
                    )}
                  </Col>
                  <Col className="text-center">
                    {cliente.clientes.subscriptions ? (
                      <p className="mb-0">
                        {new Date(
                          cliente.clientes.subscriptions.fecha_fin
                        ).toLocaleDateString('es-AR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </p>
                    ) : (
                      <p className="mb-0"> - </p>
                    )}
                  </Col>
                </div>
              ))}
            </div>
          </>
        )}
        {loading && (
          <Spinner
            variant="dark"
            className="my-5 d-block mx-auto"
            animation="border"
          />
        )}
      </Col>
      {popUp && (
        <ClientesPopup
          cliente={selectedCliente}
          onClienteUpdated={() => fetchData()}
          closePopUp={() => setPopUp(false)}
          showToast={showToast}
        />
      )}
      {popUpBorrar && (
        <PopUp
          header="Borrar cliente"
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Borrar"
          onAction={handleDelete}
          loading={loading}
          variant="danger"
        >
          <p>
            ¿Está seguro que desea borrar el usuario{' '}
            <strong>{selectedCliente.username}</strong> del cliente{' '}
            <strong>
              {selectedCliente.clientes.nombre}{' '}
              {selectedCliente.clientes.apellido}
            </strong>
            ?
          </p>
        </PopUp>
      )}
    </>
  )
}

export default ClientesCRUD
