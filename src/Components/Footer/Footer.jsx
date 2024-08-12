import { Row } from 'react-bootstrap'

function Footer() {
  return (
    <>
      <Row className="py-3 text-center text-white bg-primary texto-14">
        <p className="mb-0 fw-semibold">
          ©2024 Blanquería Marca Blanca. Todos los derechos reservados.
        </p>
        <p className="mb-0">
          Aplicación desarrollada por{' '}
          <a
            href="https://mattiruiz.github.io/"
            className="text-white fw-semibold"
            target="_blank"
          >
            Matias Ruiz
          </a>{' '}
          y{' '}
          <a
            href="https://faacuromano.github.io/"
            className="text-white fw-semibold"
            target="_blank"
          >
            Facundo Romano
          </a>
        </p>
      </Row>
    </>
  )
}

export default Footer
