function BotonSecundario({ children, onClick, className, ...props }) {
  return (
    <button
      className={`fw-semibold d-flex align-items-center bg-transparent ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default BotonSecundario
