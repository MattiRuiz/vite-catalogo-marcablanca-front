import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <Container
      fluid
      className="py-3 text-center text-white bg-primary bg-gradient "
    >
      <p className="mb-0 texto-14">
        <span className="fw-semibold">©2025 Blanquería Marca Blanca.</span>{' '}
        Todos los derechos reservados.
      </p>
      <p className="mb-0 texto-14">
        Desarrollada por{' '}
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
        .
      </p>
    </Container>
  )
}

export default Footer
