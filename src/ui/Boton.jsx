import { Button } from 'react-bootstrap'

function Boton({ children, onClick, className, ...props }) {
  return (
    <Button
      className={`bg-gradient border-0 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Boton
