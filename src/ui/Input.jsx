import { Form } from 'react-bootstrap'

function Input({ label, ...props }) {
  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control className="mb-3" {...props} />
    </>
  )
}

export default Input
