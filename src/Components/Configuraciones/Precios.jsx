import { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup, Image } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

import { Boton, PopUp } from '../../ui'

function Precios() {
  const [show, setShow] = useState(false)
  const [ganancia, setGanancia] = useState(0)
  const [showGanancia, setShowGanancia] = useState(false)
  const [gananciaReventa, setGananciaReventa] = useState('25')
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const handleGananciaReventa = (e) => {
    setGananciaReventa(e.target.value)
    if (
      isNaN(parseInt(e.target.value)) ||
      parseInt(e.target.value) < 25 ||
      parseInt(e.target.value) > 100
    ) {
      setShowError(true)
    } else {
      setShowError(false)
    }
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
      if (parseInt(ganancia) !== 0) {
        setGananciaReventa(ganancia)
      }
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

  const handleGanancia = (opt) => {
    if (opt === 'M') {
      setShowGanancia(true)
      setGanancia(0)
      setShow(true)
    } else if (opt === 'O') {
      setShowGanancia(false)
      setShow(true)
    } else if (opt === 'R') {
      setShowGanancia(true)
      setGanancia(gananciaReventa)
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
              <div className="p-4 mb-3 rounded border h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold mb-4">Mostrar precio mayorista</h5>
                  <p>
                    Muestra el precio mayorista en el catálogo. Este es el costo
                    al por mayor de los productos.
                  </p>
                </div>
                <Boton
                  disabled={showGanancia && ganancia == 0}
                  onClick={() => handleGanancia('M')}
                >
                  {showGanancia && ganancia == 0
                    ? 'Mostrando precio mayorista'
                    : 'Mostrar precio mayorista'}
                </Boton>
              </div>
            </Col>
            <Col xs={12} lg={4} className="mb-3">
              <div className="p-4 mb-3 rounded border h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold mb-4">Mostrar precio de reventa</h5>
                  <p>
                    Muestra el precio de reventa, calculado sumando tu
                    porcentaje de ganancia al precio mayorista.
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
                        value={gananciaReventa}
                        placeholder="Ingrese un valor"
                      />
                    </InputGroup>
                    {showError ? (
                      <Form.Text className="text-danger">
                        Coloque un valor entre 25 a 100%
                      </Form.Text>
                    ) : (
                      <Form.Text className="text-primary">&nbsp;</Form.Text>
                    )}
                    {showGanancia && ganancia !== 0 && (
                      <Form.Text className="mt-2">
                        Actualmente mostrando precios con un
                        <strong> {ganancia}%</strong>.
                      </Form.Text>
                    )}
                  </Form>
                </div>
                <Boton
                  className="mt-1"
                  onClick={() => handleGanancia('R')}
                  disabled={showError}
                >
                  {ganancia === gananciaReventa
                    ? 'Cambiar precio revendedor'
                    : 'Mostrar precio revendedor'}
                </Boton>
              </div>
            </Col>
            <Col xs={12} lg={4} className="mb-3">
              <div className="p-4 mb-3 rounded border h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold mb-4">Ocultar precios</h5>
                  <p>
                    Puedes ocultar completamente los precios del catálogo, útil
                    cuando no quieres que se vean públicamente.
                  </p>
                </div>
                <Boton
                  disabled={!showGanancia}
                  onClick={() => handleGanancia('O')}
                >
                  {!showGanancia ? 'Precios ocultos' : 'Ocultar precios'}
                </Boton>
              </div>
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
                ¿Estás seguro de mostrar el{' '}
                <strong>
                  precio{' '}
                  {ganancia === 0
                    ? 'mayorista'
                    : `revendedor con ${ganancia}% de ganancia`}{' '}
                </strong>
                en el catálogo?
              </p>
            </>
          ) : (
            <p className="mb-1">
              Estás por <strong>ocultar</strong> los precios en el catálogo
              ¿Deseas continuar?
            </p>
          )}
        </PopUp>
      )}
    </>
  )
}

export default Precios
