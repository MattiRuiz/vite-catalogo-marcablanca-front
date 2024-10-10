import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ModalCambiarPassword from './ModalCambiarPassword'
import { getSuscripcion } from '../../Functions/ClienteFunctions'
import { Boton } from '../../ui'

function MiCuenta() {
  const [modalCambiarPass, setModalCambiarPass] = useState(false)
  const [userSuscripcion, setUserSuscripcion] = useState(null)
  const [fechas, setFechas] = useState({
    inicio: '',
    vencimiento: '',
  })

  const user = JSON.parse(localStorage.getItem('userData'))

  return (
    <>
      <Row className="py-5 px-2 px-md-0 justify-content-center">
        <Col xs={12} md={10} lg={5}>
          <h1 className="fw-bold mb-0">Mi cuenta</h1>
          <p>Administra tu suscripción o modifica tu contraseña.</p>
          {user.esAdmin ? (
            <div className="p-4 mb-3 rounded border">
              <h6 className="text-secondary fw-bold mb-1 ">
                Información de cuenta
              </h6>
              <h3 className="fw-bold mb-0">
                Cuenta <span className="text-success">administrador</span>
              </h3>
            </div>
          ) : (
            <div className="p-4 mb-3 rounded border">
              <h6 className="text-secondary fw-bold mb-1 ">
                Plan {user?.clientes.subscriptions.tipo === 1 && 'Básico'}
                {user?.clientes.subscriptions.tipo === 2 && 'Completo'}
                {user?.clientes.subscriptions.tipo === 3 && 'Revendedores'}
              </h6>
              <h3 className="fw-bold border-bottom pb-2 mb-2">
                Estado:{' '}
                {user?.clientes.subscriptions.estado === 'active' ? (
                  <span className="text-success">Activa</span>
                ) : (
                  <span className="text-danger">Inactiva</span>
                )}
              </h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <strong>Inicio:</strong>{' '}
                  {new Date(
                    user?.clientes.subscriptions?.fecha_inicio
                  ).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </li>
                <li className="mb-0">
                  <strong>Vencimiento:</strong>{' '}
                  {new Date(
                    user?.clientes.subscriptions?.fecha_fin
                  ).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </li>
              </ul>
            </div>
          )}
          <div className="p-4 rounded border">
            <h3 className="fw-bold ">Cambiar la contraseña</h3>
            <p className="mb-0">
              Para cambiar la contraseña, haga clic en el siguiente botón y
              rellene el formulario:
            </p>
            <Boton className="mt-3" onClick={() => setModalCambiarPass(true)}>
              Cambiar la contraseña
            </Boton>
          </div>
        </Col>
      </Row>
      {modalCambiarPass && (
        <ModalCambiarPassword closePopUp={() => setModalCambiarPass(false)} />
      )}
    </>
  )
}

export default MiCuenta
