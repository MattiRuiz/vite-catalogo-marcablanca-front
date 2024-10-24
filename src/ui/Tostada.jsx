import { Toast, ToastContainer } from 'react-bootstrap'

import { PiXCircleDuotone, PiCheckCircleDuotone } from 'react-icons/pi'

function Tostada({
  children,
  show,
  onClose,
  header,
  variant = 'danger',
  delay = 3000,
}) {
  return (
    <ToastContainer
      className="position-fixed bottom-0 end-0 mb-3 me-2"
      style={{ zIndex: '9999' }}
    >
      <Toast show={show} onClose={onClose} delay={delay} autohide={true}>
        <Toast.Header>
          <span className=" me-auto d-flex align-items-center">
            {variant === 'danger' && (
              <PiXCircleDuotone className="text-danger me-1 fs-5" />
            )}
            {variant === 'success' && (
              <PiCheckCircleDuotone className="text-success me-1 fs-5" />
            )}
            <strong className="fs-6">{header}</strong>
          </span>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Tostada
