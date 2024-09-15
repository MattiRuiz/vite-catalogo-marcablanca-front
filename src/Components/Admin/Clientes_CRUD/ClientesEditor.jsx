import { useState, useEffect } from 'react'
import { Form, Row, Col, Spinner } from 'react-bootstrap'

import {
  updateCliente,
  deleteCliente,
  editSuscripcion,
} from '../../../Functions/ClienteFunctions'

import { Boton, Input, PopUp } from '../../../ui'
import { PiGearSixDuotone } from 'react-icons/pi'

const ClientesEditor = ({ cliente, onClienteUpdated, onClose, showToast }) => {
  const [clienteData, setClienteData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    username: '',
    password: '',
  })
  const [suscripcionData, setSuscripcionData] = useState()
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [tipoSuscripcion, setTipoSuscripcion] = useState('')
  const [mesesExtra, setCantMeses] = useState('')
  const [editar, setEditar] = useState(false)

  useEffect(() => {
    if (cliente) {
      setClienteData({
        id: cliente.id,
        nombre: cliente.clientes.nombre || '',
        apellido: cliente.clientes.apellido || '',
        username: cliente.username || '',
        password: cliente.password || '',
      })

      setSuscripcionData(cliente.clientes.subscriptions)
      setTipoSuscripcion(
        cliente.clientes.subscriptions
          ? cliente.clientes.subscriptions.tipo
          : ''
      )
    }
  }, [cliente])

  const handleGuardar = async () => {
    setLoading(true)

    const dataToSend = {
      ...clienteData,
    }

    if (!dataToSend.nombre || !dataToSend.apellido || !dataToSend.username) {
      showToast(
        'danger',
        'Error',
        'Hay campos vacíos, por favor complete todos los datos para continuar.'
      )
      setLoading(false)
      return
    }

    const id = cliente.id

    if (editar) {
      if (!tipoSuscripcion || !mesesExtra) {
        showToast(
          'danger',
          'Error',
          'Por favor complete los datos de suscripcion o desactive el check "Modificar suscripción"'
        )
        setLoading(false)
        return
      } else {
        const suscripcionResponse = await editSuscripcion(id, {
          tipo: tipoSuscripcion,
          mesesExtra,
        })
        if (!suscripcionResponse) {
          showToast(
            'danger',
            'Error',
            'Hubo un error al actualizar la suscripción.'
          )
          setLoading(false)
          return
        }
      }
    }

    const clienteResponse = await updateCliente(id, dataToSend)
    setLoading(false)
    if (!clienteResponse) {
      showToast(
        'danger',
        'Error',
        'Hubo un problema al querer actualizar el cliente.'
      )
    } else {
      showToast(
        'success',
        'Cliente actualizada',
        'El cliente ha sido actualizada con éxito.'
      )
    }
    onClienteUpdated()
    onClose()
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteCliente(clienteData.id)
      console.log('delete', response)

      if (response.status === 200) {
        showToast(
          'success',
          'Cliente eliminado',
          'El cliente se ha eliminado con éxito.'
        )
        onClienteUpdated()
        setPopUpBorrar(false)
        onClose()
      } else {
        showToast('danger', 'Error', response.data)
        setPopUpBorrar(false)
      }
    } catch (e) {
      showToast('danger', 'Error', 'Hubo un problema al eliminar el cliente.')
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleTipoSuscripcion = (e) => {
    setTipoSuscripcion(e.target.value)
    onSuscripcionChange({ tipo: e.target.value, meses: mesesExtra })
  }

  const handleCantMeses = (e) => {
    setCantMeses(e.target.value)
    onSuscripcionChange({ tipo: tipoSuscripcion, meses: e.target.value })
  }

  return (
    <Row className="mt-3">
      <Col xs={12} className="mb-2">
        <div className="d-flex justify-content-between bg-white p-3 rounded border">
          <h5 className="fw-bold mb-0 d-flex align-items-center">
            <PiGearSixDuotone className="me-2" />
            Editar usuario:{' '}
            <span className="fw-normal ms-2">{clienteData.username}</span>
          </h5>
          <button
            className="bg-transparent text-primary fw-semibold"
            onClick={() => onClose()}
          >
            Volver
          </button>
        </div>
      </Col>
      <Col lg={6}>
        <Form className="p-3 border rounded">
          <Input
            label="Nombre:"
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={clienteData.nombre}
            onChange={handleInputChange}
          />
          <Input
            label="Apellido:"
            type="text"
            placeholder="Apellido"
            name="apellido"
            value={clienteData.apellido}
            onChange={handleInputChange}
          />
          {cliente ? (
            <>
              <Input
                label="Contraseña:"
                type="password"
                placeholder="Password"
                name="password"
                value={clienteData.password}
                onChange={handleInputChange}
                disabled={!edit}
              />
              <Form.Check
                type="checkbox"
                label="Modificar contraseña"
                value={edit}
                onChange={() => {
                  setEdit(!edit)
                }}
              />
            </>
          ) : (
            <Input
              label="Contraseña:"
              type="password"
              placeholder="Password"
              name="password"
              value={clienteData.password}
              onChange={handleInputChange}
            />
          )}
        </Form>
      </Col>
      <Col lg={6} className="mt-3 mt-lg-0">
        <div className="border rounded mt-3 mt-lg-0">
          <div className="p-3">
            <h5 className="fw-bold border-bottom pb-3">
              Suscripción:{' '}
              {suscripcionData ? (
                <span className="text-success">
                  {' '}
                  Plan {suscripcionData.tipo === 1 && 'Básico'}
                  {suscripcionData.tipo === 2 && 'Completo'}
                </span>
              ) : (
                <span className="text-muted">A crear</span>
              )}
            </h5>
            <Form>
              {!suscripcionData && (
                <>
                  <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Tipo de suscripción:</Form.Label>
                      <Form.Select
                        onChange={handleTipoSuscripcion}
                        value={tipoSuscripcion}
                      >
                        <option value="">-- Seleccione un plan --</option>
                        <option value="1">Básico</option>
                        <option value="2">Completo</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Cant. de meses:</Form.Label>
                      <Form.Control
                        type="numeric"
                        onChange={handleCantMeses}
                        value={mesesExtra}
                      />
                    </Form.Group>
                  </Row>
                </>
              )}
              {suscripcionData && (
                <Row>
                  <Col>
                    <p className="mb-1">
                      Vencimiento:{' '}
                      {new Date(suscripcionData.fecha_fin).toLocaleDateString(
                        'es-AR',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }
                      )}
                    </p>
                    <Form.Group className="mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Modificar suscripción"
                        value={editar}
                        onChange={() => {
                          setEditar(!editar)
                        }}
                      />
                    </Form.Group>
                    {editar && (
                      <>
                        <Row className="mt-2">
                          <Form.Group as={Col}>
                            <Form.Label>Tipo de suscripción:</Form.Label>
                            <Form.Select
                              onChange={handleTipoSuscripcion}
                              value={tipoSuscripcion}
                            >
                              <option value="">-- Seleccione un plan --</option>
                              <option value="1">Básico</option>
                              <option value="2">Completo</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Meses extra:</Form.Label>
                            <Form.Control
                              type="numeric"
                              onChange={handleCantMeses}
                              value={mesesExtra}
                            />
                          </Form.Group>
                        </Row>
                      </>
                    )}
                  </Col>
                </Row>
              )}
            </Form>
          </div>
        </div>
      </Col>
      <div className="mt-3 d-flex justify-content-between">
        <Boton variant="danger" onClick={() => setPopUpBorrar(true)}>
          Borrar usuario
        </Boton>
        <Boton onClick={() => handleGuardar()} disabled={loading}>
          {loading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            'Guardar cambios'
          )}
        </Boton>
      </div>
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
            <strong>{clienteData.username}</strong> del cliente{' '}
            <strong>
              {clienteData.nombre} {clienteData.apellido}
            </strong>
            ?
          </p>
        </PopUp>
      )}
    </Row>
  )
}

export default ClientesEditor
