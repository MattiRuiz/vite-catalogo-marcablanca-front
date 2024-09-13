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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await getSuscripcion(user.id)
          setUserSuscripcion(response.data)
          const fechaInicio = new Date(
            response.data.fecha_inicio
          ).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
          const fechaVencimiento = new Date(
            response.data.fecha_fin
          ).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })

          setFechas({
            inicio: fechaInicio,
            vencimiento: fechaVencimiento,
          })
        }
      } catch (error) {
        console.log('Error al obtener las suscripciones: ', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Row className="py-5 px-2 px-md-0 justify-content-center">
        <Col xs={12} md={10} lg={5}>
          <h1 className="fw-bold mb-0">Mi cuenta</h1>
          <p>Administra tu suscripción o modifica tu contraseña.</p>
          <div className="p-4 mb-3 rounded border">
            <h6 className="text-secondary fw-bold mb-1 ">
              Plan {userSuscripcion?.tipo === 1 && 'Básico'}
              {userSuscripcion?.tipo === 2 && 'Completo'}
              {userSuscripcion?.tipo === 3 && 'Revendedores'}
            </h6>
            <h3 className="fw-bold border-bottom pb-2 mb-2">
              Estado:{' '}
              {userSuscripcion?.estado === 'active' ? (
                <span className="text-success">Activa</span>
              ) : (
                <span className="text-danger">Inactiva</span>
              )}
            </h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-1">
                <strong>Inicio:</strong> {fechas.inicio}
              </li>
              <li className="mb-0">
                <strong>Vencimiento:</strong> {fechas.vencimiento}
              </li>
            </ul>
          </div>
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
