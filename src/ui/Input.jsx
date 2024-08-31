import { Form } from 'react-bootstrap'

function Input({ label, ...props }) {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...props} />
    </Form.Group>
  )
}

export default Input
