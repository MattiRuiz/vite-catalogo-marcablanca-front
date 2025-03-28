import { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup, Card } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

import { Boton, PopUp, Tostada } from '../../ui'

function Visualizacion() {
  const [show, setShow] = useState(false)
  const [ganancia, setGanancia] = useState('')
  const [showGanancia, setShowGanancia] = useState(false)
  const navigate = useNavigate()
  const [storedData, setStoredData] = useState({
    showGanancia: false,
    ganancia: '',
  })

  const [toastConfig, setToastConfig] = useState({
    show: false,
    variant: 'danger',
    header: '',
    message: '',
  })

  const handleShowToast = (variant, header, message) => {
    setToastConfig({
      show: true,
      variant,
      header,
      message,
    })
  }

  const fetchData = () => {
    const showGananciaCase = localStorage.getItem('showGanancia') === 'true'
    const gananciaCase = parseInt(localStorage.getItem('ganancia')) || ''
    setStoredData({ showGanancia: showGananciaCase, ganancia: gananciaCase })
    setGanancia(gananciaCase)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleGananciaReventa = (e) => {
    setGanancia(e.target.value)
  }

  const mostrarPrecios = () => {
    localStorage.setItem('ganancia', ganancia ? ganancia : '')
    localStorage.setItem('showGanancia', showGanancia)
    navigate('/')
  }

  const handleGanancia = (opt) => {
    if (opt === 'M') {
      setShowGanancia(true)
      setGanancia('')
      setShow(true)
    } else if (opt === 'R') {
      if (!ganancia || isNaN(ganancia)) {
        handleShowToast(
          'danger',
          'Error',
          'Por favor indique un porcentaje de ganancia válido.'
        )
      } else if (ganancia < 25 || ganancia > 100) {
        handleShowToast(
          'danger',
          'Error',
          'El porcentaje de ganancia debe ser un valor entre 25% al 100%.'
        )
      } else {
        setShowGanancia(true)
        setShow(true)
      }
    } else if (opt === 'O') {
      setShowGanancia(false)
      setGanancia('')
      setShow(true)
    }
  }

  return (
    <>
      <Row className="py-5 justify-content-center">
        <Col xs={12} md={10}>
          <h1 className="fw-bold text-center mb-1">
            Configurar visualización de precios
          </h1>
          <p className="text-center mb-4">
            Permite <strong>mostrar u ocultar</strong> los precios de los
            productos en el catálogo.
          </p>
          <Row className="mb-3 text-center">
            <Col xs={12} lg={4} className="mb-3">
              <Card
                className="h-100"
                bg={storedData.showGanancia && storedData.ganancia && 'info'}
              >
                <Card.Header className="border-bottom-0 pb-0">
                  <h3 className="fw-bold mb-0">Precio de reventa</h3>
                </Card.Header>
                <Card.Body>
                  <div>
                    <p>
                      {' '}
                      Permite a los <em>revendedores</em> mostrarle el precio de
                      reventa a sus <em>clientes</em>. Para activarlo debes
                      indicar un <strong>porcentaje de ganancia.</strong>
                    </p>
                    <Form>
                      <Form.Label className="fw-bold">
                        Indique el porcentaje de ganancia
                      </Form.Label>
                      <InputGroup
                        className="mx-auto"
                        style={{ maxWidth: '200px' }}
                      >
                        <InputGroup.Text>%</InputGroup.Text>
                        <Form.Control
                          onChange={(e) => handleGananciaReventa(e)}
                          value={ganancia}
                          placeholder="00"
                        />
                      </InputGroup>
                      {storedData.showGanancia &&
                        storedData.ganancia !== '' && (
                          <Form.Text className="mt-1 d-block text-primary fs-6">
                            Mostrando precios con un
                            <strong>
                              {' '}
                              {storedData.ganancia}% de ganancia.
                            </strong>
                          </Form.Text>
                        )}
                    </Form>
                  </div>
                </Card.Body>
                <Card.Footer className="border-top-0">
                  <Boton className="w-100" onClick={() => handleGanancia('R')}>
                    Mostrar precio revendedor
                  </Boton>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} lg={4} className="mb-3">
              <Card
                className="h-100"
                bg={storedData.showGanancia && !storedData.ganancia && 'info'}
              >
                <Card.Header className="border-bottom-0  pb-0">
                  <h3 className="fw-bold mb-0">Precio mayorista</h3>
                </Card.Header>
                <Card.Body>
                  <p>
                    Permite al <em>revendedor</em> ver los precios{' '}
                    <strong>de costo</strong> de los productos.{' '}
                    <span className="text-decoration-underline">Cuidado:</span>{' '}
                    Estos precios no deberían ser vistos por sus{' '}
                    <em>clientes</em>.
                  </p>
                </Card.Body>
                <Card.Footer className="border-top-0">
                  <Boton
                    disabled={storedData.showGanancia && !storedData.ganancia}
                    onClick={() => handleGanancia('M')}
                    className="w-100"
                  >
                    {storedData.showGanancia && !storedData.ganancia
                      ? 'Mostrando precio mayorista'
                      : 'Mostrar precio mayorista'}
                  </Boton>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} lg={4} className="mb-3">
              <Card className="h-100" bg={!storedData.showGanancia && 'info'}>
                <Card.Header className="border-bottom-0 pb-0">
                  <h3 className="fw-bold mb-0">Ocultar precios</h3>
                </Card.Header>
                <Card.Body>
                  <p>
                    Oculta{' '}
                    <strong className="text-decoration-underline">todos</strong>{' '}
                    los precios del catálogo.
                  </p>
                </Card.Body>
                <Card.Footer className="border-top-0">
                  <Boton
                    disabled={!storedData.showGanancia}
                    onClick={() => handleGanancia('O')}
                    className="w-100"
                  >
                    {!storedData.showGanancia
                      ? 'Los precios se encuentran ocultos'
                      : 'Ocultar precios'}
                  </Boton>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          <p className="text-center texto-14 fst-italic">
            Todos los precios exhibidos se encuentran sujetos a cambio, para más
            información puede visitar nuestros{' '}
            <Link className="fw-bold text-primary" to="/terminos-y-condiciones">
              Términos y condiciones.
            </Link>
          </p>
        </Col>
      </Row>
      {toastConfig.show && (
        <Tostada
          show={toastConfig.show}
          onClose={() => setToastConfig({ ...toastConfig, show: false })}
          header={toastConfig.header}
          variant={toastConfig.variant}
        >
          {toastConfig.message}
        </Tostada>
      )}
      {show && (
        <PopUp
          header="Configurar precios"
          closePopUp={() => setShow(false)}
          buttonLabel="Aceptar"
          onAction={mostrarPrecios}
          variant="primary"
        >
          {showGanancia ? (
            <>
              <p className="mb-2">
                Al aceptar vas volver al inicio y mostrar el{' '}
                <strong>
                  precio{' '}
                  {ganancia === ''
                    ? 'mayorista'
                    : `revendedor con ${ganancia}% de ganancia`}{' '}
                </strong>
                en el catálogo. ¿Deseas continuar?
              </p>
            </>
          ) : (
            <p className="mb-1">
              Estás por volver al inicio y <strong>ocultar</strong> los precios
              en el catálogo. ¿Deseas continuar?
            </p>
          )}
        </PopUp>
      )}
    </>
  )
}

export default Visualizacion
