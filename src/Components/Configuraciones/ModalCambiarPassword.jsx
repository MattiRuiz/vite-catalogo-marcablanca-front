import { useState, useContext } from 'react'
import { Modal, Spinner, Form, Alert } from 'react-bootstrap'

import { changePassword } from '../../Functions/ClienteFunctions'
import LoginContext from '../../Context/LoginContext'

import { Boton, Tostada } from '../../ui'

const ModalCambiarPassword = ({ closePopUp }) => {
  const { unauthorize } = useContext(LoginContext)
  const [loading, setLoading] = useState(false)
  const [toastConfig, setToastConfig] = useState({
    show: false,
    variant: 'danger',
    header: '',
    message: '',
  })

  const handleShowToast = (variant, header, message) => {
    setToastConfig({
      show: true,
      variant,
      header,
      message,
    })
  }

  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newPassRep, setNewPassRep] = useState('')

  const handleOldPass = (e) => setOldPass(e.target.value)
  const handleNewPass = (e) => setNewPass(e.target.value)
  const handleNewPassRep = (e) => setNewPassRep(e.target.value)
  const deleteInputs = () => {
    setOldPass('')
    setNewPass('')
    setNewPassRep('')
  }

  const handleChangePassword = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    setLoading(true)

    if (!userData) {
      handleShowToast(
        'danger',
        'Cuenta no logueada',
        'Su cuenta no se encuentra logueada, por favor ingrese nuevamente para poder continuar.'
      )
      setTimeout(() => unauthorize(), 3000)
    } else if (newPass != newPassRep) {
      handleShowToast(
        'danger',
        'Error',
        'Las contraseñas nuevas no coinciden, por favor revise esa información e intente de nuevo.'
      )
    } else if (!oldPass || !newPass || !newPassRep) {
      handleShowToast('danger', 'Error', 'Hay campos que se encuentran vacíos.')
    } else if (newPass.length < 2) {
      handleShowToast(
        'danger',
        'Error',
        'El largo de la contraseña nueva debe de ser mayor a 6 caracteres.'
      )
    } else {
      const dataToSend = {
        newPassword: newPass,
        password: oldPass,
        confirmPassword: newPassRep,
      }
      const response = await changePassword(userData.id, dataToSend)

      if (!response) {
        handleShowToast(
          'danger',
          'Error',
          'Hubo un problema al actualizar la contraseña.'
        )
      } else {
        handleShowToast(
          'success',
          'Contraseña actualizada',
          'La contraseña ha sido actualizada con éxito.'
        )
        deleteInputs()
      }
    }
    setLoading(false)
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="bg-primario text-white border-0" closeButton>
        <Modal.Title>Cambiar contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fw-bold">Ingrese la siguiente información:</p>
        <Form>
          <Form.Label>Ingrese la contraseña actual:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña actual"
            className="mb-3"
            value={oldPass}
            onChange={handleOldPass}
          />
          <Form.Label>Ingrese la contraseña nueva:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña nueva"
            className="mb-3"
            value={newPass}
            onChange={handleNewPass}
          />
          <Form.Label>Repita la contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repita la contraseña"
            className="mb-1"
            value={newPassRep}
            onChange={handleNewPassRep}
          />
        </Form>
        <Tostada
          show={toastConfig.show}
          onClose={() => setToastConfig({ ...toastConfig, show: false })}
          header={toastConfig.header}
          variant={toastConfig.variant}
        >
          {toastConfig.message}
        </Tostada>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Boton variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Boton>
        <Boton onClick={handleChangePassword}>
          {loading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            'Cambiar'
          )}
        </Boton>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCambiarPassword
