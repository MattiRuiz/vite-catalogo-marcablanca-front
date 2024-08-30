import { useState, useEffect } from 'react'
import { Col, Spinner } from 'react-bootstrap'

import {
  getAllClientes,
  deleteCliente,
} from '../../../../Functions/ClienteFunctions'

import ClientesPopup from './ClientesCRUD_popup'

import { PiXCircleDuotone } from 'react-icons/pi'
import { PopUp, Boton } from '../../../../ui'

const ClientesCRUD = ({ showToast }) => {
  const [clientes, setClientes] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  const [loading, setLoading] = useState(false)

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

  return (
    <>
      <Col xs={12}>
        <div className="mb-2 border-bottom pb-2">
          <Boton className="me-2" onClick={() => openPopup(null)}>
            Crear cliente
          </Boton>
        </div>
        <div className="d-flex align-items-center justify-content-between p-2 bg-dark mt-3 rounded-top text-white">
          <Col>
            <p className="mb-0 texto-14 fw-bold">Usuario</p>
          </Col>
          <Col>
            <p className="mb-0 texto-14 fw-bold">Nombre y apellido</p>
          </Col>
          <Col xs={2}>
            <p className="mb-0 texto-14 fw-bold text-center">Opciones</p>
          </Col>
        </div>
        <div className="bg-white">
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              className="border-bottom d-flex align-items-center justify-content-between p-2"
            >
              <Col>{cliente.username}</Col>
              <Col>
                {cliente.clientes.nombre} {cliente.clientes.apellido}
              </Col>
              <Col xs={2} className="d-flex justify-content-center">
                <button
                  className="texto-14 fw-semibold py-0 border-end bg-transparent"
                  onClick={() => openPopup(cliente)}
                >
                  Editar
                </button>
                <button
                  className="texto-14 fw-semibold py-0 bg-transparent"
                  onClick={() => openPopUpBorrar(cliente)}
                >
                  Borrar
                </button>
              </Col>
            </div>
          ))}
        </div>
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
          header={
            <>
              <PiXCircleDuotone className="me-2 text-danger" />
              Borrar cliente
            </>
          }
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Borrar"
          onAction={handleDelete}
          loading={loading}
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
