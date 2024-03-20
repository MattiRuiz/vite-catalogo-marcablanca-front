import { useState, useContext } from 'react'
import { Modal, Button, Spinner, Form, Alert } from 'react-bootstrap'

import { changePassword } from '../../Functions/ClienteFunctions'

import LoginContext from '../../Context/LoginContext'

const ModalCambiarPassword = ({ closePopUp }) => {
  const { auth } = useContext(LoginContext)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState('danger')
  const [alertHeader, setAlertHeader] = useState('Error')
  const [alertMessage, setAlertMessage] = useState(
    'No se ha podido cambiar su contraseña'
  )

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
    setLoading(true)
    setShowAlert(false)
    if (newPass != newPassRep) {
      setAlertVariant('danger')
      setAlertHeader('Error')
      setAlertMessage(
        'Las contraseñas nuevas no coinciden, por favor revise esa información e intente de nuevo.'
      )
      setShowAlert(true)
    }
    if (!oldPass || !newPass || !newPassRep) {
      setAlertVariant('danger')
      setAlertHeader('Error')
      setAlertMessage('Hay campos que se encuentran vacíos.')
      setShowAlert(true)
    }
    if (newPass.length < 2) {
      setAlertVariant('danger')
      setAlertHeader('Error')
      setAlertMessage(
        'El largo de la contraseña nueva debe de ser mayor a 6 caracteres.'
      )
      setShowAlert(true)
    } else {
      const userData = JSON.parse(window.localStorage.getItem('userData'))
      const dataToSend = {
        newPassword: newPass,
        password: oldPass,
        confirmPassword: newPassRep,
      }

      const response = await changePassword(userData.id, dataToSend)
      if (!response) {
        setAlertVariant('danger')
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al actualizar la contraseña.')
        setShowAlert(true)
      } else {
        setAlertVariant('success')
        setAlertHeader('Contraseña actualizada')
        setAlertMessage('La contraseña ha sido actualizada con éxito.')
        setShowAlert(true)
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
        <Alert
          variant={alertVariant}
          className="mt-3 mb-0"
          onClose={() => setShowAlert(false)}
          show={showAlert}
          dismissible
        >
          <Alert.Heading className="fs-6">
            <strong>{alertHeader}</strong>
          </Alert.Heading>
          {alertMessage}
        </Alert>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button onClick={handleChangePassword}>
          {loading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            'Cambiar'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCambiarPassword
