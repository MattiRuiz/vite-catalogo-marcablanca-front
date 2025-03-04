import { Alert, Button } from 'react-bootstrap'

function InvitacionFeedback() {
  return (
    <Alert variant="info" className="text-center my-4">
      <h5>🎉 ¡Tu opinión es muy importante!</h5>
      <p>
        Estamos en la etapa beta de nuestro Catálogo Digital Marca Blanca y
        queremos saber qué te parece. Ayúdanos a mejorarlo respondiendo una
        breve encuesta.
      </p>
      <Button
        variant="primary"
        href="https://forms.gle/wuDBrG2E7wUQ8eRH8"
        target="_blank"
        rel="noopener noreferrer"
      >
        Responder encuesta
      </Button>
    </Alert>
  )
}

export default InvitacionFeedback
