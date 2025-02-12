import { useState, useEffect } from 'react'
import { Form, Row, Col, Spinner } from 'react-bootstrap'

import {
  updateCliente,
  createSuscripcion,
  editSuscripcion,
  cancelSuscripcion,
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
    const clienteResponse = await updateCliente(cliente.id, dataToSend)
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

  const editarSuscripcion = async () => {
    setLoading(true)
    if (!tipoSuscripcion || !mesesExtra) {
      showToast(
        'danger',
        'Error',
        'Por favor complete los datos de suscripcion'
      )
      setLoading(false)
      return
    } else {
      const suscripcionResponse = await editSuscripcion(cliente.id, {
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
      } else {
        showToast(
          'success',
          'Suscripción editada',
          'La suscripción ha sido modificada con éxito.'
        )
        onClienteUpdated()
        onClose()
      }
    }
  }

  const crearSuscripcion = async () => {
    setLoading(true)
    if (!tipoSuscripcion || !mesesExtra) {
      showToast(
        'danger',
        'Error',
        'Por favor complete los datos de suscripcion'
      )
      setLoading(false)
      return
    } else {
      const suscripcionResponse = await createSuscripcion({
        cliente_id: cliente.id,
        meses: mesesExtra,
        tipo: Number(tipoSuscripcion),
      })
      if (!suscripcionResponse) {
        showToast('danger', 'Error', 'Hubo un error al crear la suscripción.')
        setLoading(false)
        return
      } else {
        showToast(
          'success',
          'Suscripción creada',
          'La suscripción ha sido creada con éxito.'
        )
        onClienteUpdated()
        onClose()
      }
    }
  }

  const handleCancelar = async () => {
    setLoading(true)
    try {
      const response = await cancelSuscripcion(cliente.id)
      showToast(
        'success',
        'Suscripción cancelada',
        'La suscripción del cliente ha sido canceled con éxito.'
      )
      onClienteUpdated()
      onClose()
      setPopUpBorrar(false)
    } catch (e) {
      showToast(
        'danger',
        'Error',
        'Hubo un problema al cancelar la suscripción.'
      )
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
            label="Nombre"
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={clienteData.nombre}
            onChange={handleInputChange}
          />
          <Input
            label="Apellido"
            type="text"
            placeholder="Apellido"
            name="apellido"
            value={clienteData.apellido}
            onChange={handleInputChange}
          />
          {cliente ? (
            <>
              <Input
                label="Contraseña"
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
          <Boton
            className="mt-3"
            onClick={() => handleGuardar()}
            disabled={loading}
          >
            Editar usuario
          </Boton>
        </Form>
      </Col>
      <Col lg={6} className="mt-3 mt-lg-0">
        <div className="border rounded mt-3 mt-lg-0">
          <div className="p-3">
            <h5 className="fw-bold border-bottom pb-3">
              Suscripción:{' '}
              {suscripcionData === null && (
                <span className="text-muted">A crear</span>
              )}
              {suscripcionData?.estado === 'active' && (
                <span className="text-success">Activa</span>
              )}
              {suscripcionData?.estado === 'expired' && (
                <span className="text-danger">Vencida</span>
              )}
              {suscripcionData?.estado === 'canceled' && (
                <span className="text-danger">Cancelada</span>
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
                        <option value="1">Plan Completo</option>
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
                  <div className="mt-3">
                    <Boton
                      onClick={() => crearSuscripcion()}
                      disabled={loading}
                    >
                      Crear suscripción
                    </Boton>
                  </div>
                </>
              )}
              {suscripcionData && (
                <Row>
                  <Col>
                    <p className="mb-2">
                      <strong>Plan:</strong>{' '}
                      {suscripcionData.tipo === 1 && 'Completo'}
                    </p>
                    <p className="mb-2">
                      <strong>Inicio:</strong>{' '}
                      {new Date(
                        suscripcionData.fecha_inicio
                      ).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="mb-2">
                      <strong>Finalización:</strong>{' '}
                      {new Date(suscripcionData.fecha_fin).toLocaleDateString(
                        'es-AR',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }
                      )}
                    </p>
                    <Form.Group className="mt-3">
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
                        <Row className="mt-3">
                          <Form.Group as={Col}>
                            <Form.Label>Tipo de suscripción:</Form.Label>
                            <Form.Select
                              onChange={handleTipoSuscripcion}
                              value={tipoSuscripcion}
                            >
                              <option value="">-- Seleccione un plan --</option>
                              <option value="1">Plan Completo</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Meses:</Form.Label>
                            <Form.Control
                              type="numeric"
                              onChange={handleCantMeses}
                              value={mesesExtra}
                            />
                          </Form.Group>
                        </Row>
                        <div className="mt-3 d-flex justify-content-between">
                          <Boton
                            onClick={() => editarSuscripcion()}
                            disabled={loading}
                          >
                            Editar suscripción
                          </Boton>
                          <Boton
                            variant="danger"
                            onClick={() => setPopUpBorrar(true)}
                            disabled={loading}
                          >
                            Cancelar suscripción
                          </Boton>
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
              )}
            </Form>
          </div>
        </div>
      </Col>
      {popUpBorrar && (
        <PopUp
          header="Cancelar suscripción"
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Aceptar"
          onAction={handleCancelar}
          loading={loading}
          variant="danger"
        >
          <p>
            ¿Está seguro que desea cancelar la suscripción del usuario{' '}
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
