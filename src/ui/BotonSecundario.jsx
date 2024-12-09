import { Button } from 'react-bootstrap'

function BotonSecundario({ children, onClick, className, ...props }) {
  return (
    <Button
      className={`fw-semibold d-flex align-items-center bg-transparent text-dark border-0 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  )
}

export default BotonSecundario
