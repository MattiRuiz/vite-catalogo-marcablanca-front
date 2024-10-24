import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ModalCambiarPassword from './ModalCambiarPassword'

function MiCuenta() {
  const [modalCambiarPass, setModalCambiarPass] = useState(false)

  const user = JSON.parse(localStorage.getItem('userData'))

  return (
    <>
      <Row className="justify-content-center justify-content-md-around align-items-center alto-container">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h1 className="fw-bold mb-1">Mi cuenta</h1>
          <p>Ve el estado de tu suscripción o modifica tu contraseña.</p>
          {user.esAdmin ? (
            <div className="p-5 mb-3 rounded border">
              <h6 className="text-secondary fw-bold mb-1 ">
                Información de cuenta
              </h6>
              <h3 className="fw-bold mb-0">
                Cuenta <span className="text-success">administrador</span>
              </h3>
            </div>
          ) : (
            <div className="p-5 mb-3 rounded border">
              <h6 className="text-secondary fw-bold mb-1 ">
                Plan {user?.clientes.subscriptions.tipo === 1 && 'Completo'}
                {user?.clientes.subscriptions.tipo === 2 && 'Revendedores'}
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
          <p>
            <strong>¿Necesitas cambiar la contraseña?</strong> Hacé{' '}
            <a
              className="fw-bold text-primary"
              onClick={() => setModalCambiarPass(true)}
            >
              click acá
            </a>{' '}
            y rellená el formulario.
          </p>
        </Col>
      </Row>
      {modalCambiarPass && (
        <ModalCambiarPassword closePopUp={() => setModalCambiarPass(false)} />
      )}
    </>
  )
}

export default MiCuenta
