import { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { PiEye, PiEyeSlash } from 'react-icons/pi'

function PasswordInput({ label, ...props }) {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Form.Group className="mb-3">
      {label ? (
        <Form.Label>{label}</Form.Label>
      ) : (
        <Form.Label>Contraseña</Form.Label>
      )}
      <InputGroup>
        <Form.Control type={showPassword ? 'text' : 'password'} {...props} />
        <InputGroup.Text
          onClick={handleShowPassword}
          style={{ cursor: 'pointer' }}
        >
          {showPassword ? (
            <PiEyeSlash className="fs-5" />
          ) : (
            <PiEye className="fs-5" />
          )}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  )
}

export default PasswordInput
