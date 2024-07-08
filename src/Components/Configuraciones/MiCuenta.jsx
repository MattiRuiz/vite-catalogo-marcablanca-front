import { useState } from 'react'
import { Row, Col, Button, Container } from 'react-bootstrap'

import ModalCambiarPassword from './ModalCambiarPassword'

function MiCuenta() {
  const [modalCambiarPass, setModalCambiarPass] = useState(false)

  return (
    <>
      <Container className="py-5">
        <Row className="pt-5">
          <h3 className="fw-bold mb-3">Configuración</h3>
          <Col xs={12} lg={10}>
            <div className="p-4 rounded border">
              <h4 className="fw-semibold ">Cambiar la contraseña</h4>
              <p className="mb-0">
                Para cambiar la contraseña, haga clic en el siguiente botón y
                rellene el formulario:
              </p>
              <Button
                className="mt-3"
                onClick={() => setModalCambiarPass(true)}
              >
                Cambiar la contraseña
              </Button>
            </div>
          </Col>
        </Row>
        {modalCambiarPass ? (
          <ModalCambiarPassword closePopUp={() => setModalCambiarPass(false)} />
        ) : (
          <></>
        )}
      </Container>
    </>
  )
}

export default MiCuenta
