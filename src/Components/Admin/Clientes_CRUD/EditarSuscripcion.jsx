import { useState, useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

import { Boton } from '../../../ui'

import {
  createSuscripcion,
  editSuscripcion,
} from '../../../Functions/ClienteFunctions'

const EditarSuscripcion = ({
  suscripcion,
  onSuscripcionChange,
  id,
  showToast,
  close,
}) => {
  const [tipoSuscripcion, setTipoSuscripcion] = useState('')
  const [cantMeses, setCantMeses] = useState('')
  const [editar, setEditar] = useState(false)

  const handleTipoSuscripcion = (e) => {
    setTipoSuscripcion(e.target.value)
    onSuscripcionChange({ tipo: e.target.value, meses: cantMeses })
  }

  const handleCantMeses = (e) => {
    setCantMeses(e.target.value)
    onSuscripcionChange({ tipo: tipoSuscripcion, meses: e.target.value })
  }

  const guardarSuscripcion = async () => {
    if (!cantMeses || !tipoSuscripcion) {
      showToast(
        'danger',
        'Error',
        'Rellene los datos de suscripcion para continuar.'
      )
    } else if (!editar) {
      const dataToSend = {
        cliente_id: id,
        meses: parseInt(cantMeses),
        tipo: parseInt(tipoSuscripcion),
      }
      const response = await createSuscripcion(dataToSend)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer actualizar una suscripción.'
        )
      } else {
        showToast(
          'success',
          'Suscripción creada',
          'La suscripción ha sido actualizada.'
        )
        close()
      }
    } else {
      const dataToSend = {
        mesesExtra: parseInt(cantMeses),
        tipo: parseInt(tipoSuscripcion),
      }
      const response = await editSuscripcion(id, dataToSend)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer crear la suscripción.'
        )
      } else {
        showToast(
          'success',
          'Suscripción creada',
          'La suscripción ha sido creada con éxito.'
        )
        close()
      }
    }
  }

  useEffect(() => {
    if (suscripcion) {
      setTipoSuscripcion(suscripcion.tipo)
    }
  }, [])

  return (
    <div className="p-3">
      <h5 className="fw-bold border-bottom pb-3">
        Suscripción:{' '}
        {suscripcion ? (
          <span className="text-success">
            {' '}
            Plan {suscripcion.tipo === 1 && 'Básico'}
            {suscripcion.tipo === 2 && 'Completo'}
          </span>
        ) : (
          <span className="text-muted">A crear</span>
        )}
      </h5>
      <Form>
        {!suscripcion && (
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
                  value={cantMeses}
                />
              </Form.Group>
            </Row>
          </>
        )}
        {suscripcion && (
          <Row>
            <Col>
              <p className="mb-1">
                Vencimiento:{' '}
                {new Date(suscripcion.fecha_fin).toLocaleDateString('es-AR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
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
                        value={cantMeses}
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
  )
}

export default EditarSuscripcion
