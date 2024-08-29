import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

import ModalCambiarPassword from './ModalCambiarPassword'

import { getSuscripcion } from '../../Functions/ClienteFunctions'

import { Boton } from '../../ui'

function MiCuenta() {
  const [modalCambiarPass, setModalCambiarPass] = useState(false)
  const [userSuscripcion, setUserSuscripcion] = useState()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = JSON.parse(localStorage.getItem('userData'))
  //       console.log('user', user.id)
  //       if (user) {
  //         const response = await getSuscripcion(user.id)
  //         setUserSuscripcion(response.data)
  //       }
  //     } catch (error) {
  //       console.log('Error al obtener las suscripciones: ', error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return (
    <>
      <Row className="py-5 px-2 px-md-0 justify-content-center">
        <Col xs={12} lg={10}>
          <h1 className="fw-bold mb-0">Mi cuenta</h1>
          <p>Administra tu suscripción o modifica tu contraseña.</p>
          <div className="p-4 mb-3 rounded border">
            <h6 className="text-primary fw-bold mb-1">Tu suscripción</h6>
            <h3 className="fw-bold border-bottom pb-2 mb-3">
              Estado de la suscripción:{' '}
              <span className="text-success">Activa</span>
            </h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong>Usuario:</strong>
              </li>
              <li className="mb-2">
                <strong>Inicio:</strong>
              </li>
              <li className="mb-2">
                <strong>Vencimiento:</strong>
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
      {modalCambiarPass ? (
        <ModalCambiarPassword closePopUp={() => setModalCambiarPass(false)} />
      ) : (
        <></>
      )}
    </>
  )
}

export default MiCuenta
