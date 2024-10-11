import { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup, Image } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

import PDFIcon from '../../Images/pdf.png'

import { Boton, PopUp } from '../../ui'

function Precios() {
  const [show, setShow] = useState(false)
  const [ganancia, setGanancia] = useState(0)
  const [showGanancia, setShowGanancia] = useState(false)
  const navigate = useNavigate()

  const handleValor = (e) => {
    if (!e.target.value) {
      setGanancia(0)
    } else {
      setGanancia(e.target.value)
    }
  }
  const handleShowGanacia = (e) => {
    setShowGanancia(e.target.checked)
  }

  const mostrarPrecios = () => {
    localStorage.setItem('ganancia', ganancia)
    localStorage.setItem('showGanancia', showGanancia)
    navigate('/')
  }

  const dataSave = () => {
    const showGananciaCase = localStorage.getItem('showGanancia')
    if (showGananciaCase != null) {
      setGanancia(localStorage.getItem('ganancia'))
      setShowGanancia(showGananciaCase.toLowerCase?.() === 'true')
    } else {
      localStorage.setItem('ganancia', 0)
      localStorage.setItem('showGanancia', false)
    }

    setShow(false)
  }

  useEffect(() => {
    dataSave()
  }, [])

  return (
    <>
      <Row className="py-5 px-2 px-md-0 justify-content-center">
        <Col xs={12} md={10} lg={5}>
          <h1 className="fw-bold">Configurar precios *</h1>
          <p>
            Descarga la lista de precio o modifica la configuración de tu
            catálogo digital.
          </p>
          <div className="p-4 mb-3 rounded border">
            <h4 className="fw-semibold">Lista de precios</h4>
            <p>Descarga la lista de precios actualizada en formato PDF.</p>
            <Boton
              href={`https://catalogo-marcablanca.s3.sa-east-1.amazonaws.com/Lista_de_productos.pdf`}
              download
              target="_blank"
              variant="primary"
            >
              <Image src={PDFIcon} style={{ width: '50px' }} className="me-3" />
              Descargar PDF
            </Boton>
          </div>
          <div className="p-4 mb-3 rounded border">
            <h4 className="fw-semibold">Precios en el catálogo</h4>
            <p>
              Permite mostrar/ocultar los precios de los productos en el
              catálogo. Estos pueden ser:
            </p>
            <h5>Precio Mayorista</h5>
            <p>
              Al activar esta opción se mostrará en el catálogo el{' '}
              <strong>precio para revendedores.</strong>
            </p>
            <Boton>Mostrar precio mayorista</Boton>
            <Form>
              <Form.Check
                onChange={(e) => handleShowGanacia(e)}
                checked={showGanancia}
                type="switch"
                label="Mostrar precios"
                className="mt-2 mb-4 fw-semibold"
              />
            </Form>
            <Form>
              <Form.Label>Porcentaje de ganancia:</Form.Label>
              <Row className="align-items-center">
                <Col xs={12} sm={4}>
                  <InputGroup>
                    <InputGroup.Text>%</InputGroup.Text>
                    <Form.Control
                      onChange={(e) => handleValor(e)}
                      value={ganancia}
                      type="number"
                      placeholder="Ingrese un valor"
                      disabled={!showGanancia}
                    />
                  </InputGroup>
                </Col>
                <Form.Text className="text-muted mt-2">
                  Si indicas un porcentaje de ganancia de 0, podrás ver el{' '}
                  <strong>precio mayorista.</strong>
                </Form.Text>
              </Row>
            </Form>
            <Boton className="mt-3" onClick={() => setShow(true)} type="button">
              Aplicar cambios
            </Boton>
          </div>
          <p>
            * Todos los precios exhibidos se encuentran sujetos a cambio, para
            más información puede visitar nuestros{' '}
            <Link
              className="fw-bold text-primary"
              to="http://localhost:5173/terminos-y-condiciones"
            >
              Términos y condiciones.
            </Link>
          </p>
        </Col>
      </Row>
      {show && (
        <PopUp
          header="Mostrar/ocultar precios"
          closePopUp={() => setShow(false)}
          buttonLabel="Aceptar"
          onAction={mostrarPrecios}
          variant="primary"
        >
          {showGanancia ? (
            <>
              <p className="mb-2">
                Estás por <strong>mostrar</strong> el precio
              </p>
              <ul>
                <li>
                  <h5 className="mb-0">
                    <strong>
                      {' '}
                      {ganancia === '0'
                        ? 'Precio mayorista'
                        : `Precio revendedor con un ${ganancia}% de ganancia`}
                    </strong>
                  </h5>
                </li>
              </ul>
            </>
          ) : (
            <p className="mb-1">
              Estás por <strong>ocultar</strong> los precios del catálogo
              ¿Deseas continuar?
            </p>
          )}
        </PopUp>
      )}
    </>
  )
}

export default Precios
