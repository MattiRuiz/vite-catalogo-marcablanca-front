import { useState, useContext } from 'react'
import { Form } from 'react-bootstrap'

import { changePassword } from '../../Functions/ClienteFunctions'
import LoginContext from '../../Context/LoginContext'

import { Tostada, PasswordInput, PopUp } from '../../ui'
import { PiGearSixDuotone } from 'react-icons/pi'

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
  const deletePasswordInputs = () => {
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
        deletePasswordInputs()
      }
    }
    setLoading(false)
  }

  return (
    <PopUp
      header={
        <>
          <PiGearSixDuotone className="me-2" /> Cambiar contraseña
        </>
      }
      closePopUp={closePopUp}
      buttonLabel="Cambiar"
      onAction={handleChangePassword}
      loading={loading}
      variant="primary"
    >
      <p className="fw-bold">Ingrese la siguiente información:</p>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          handleChangePassword()
        }}
      >
        <PasswordInput
          label="Ingrese la contraseña actual"
          value={oldPass}
          onChange={handleOldPass}
        />
        <PasswordInput
          label="Ingrese la contraseña nueva"
          value={newPass}
          onChange={handleNewPass}
        />
        <PasswordInput
          label="Repita la contraseña"
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
    </PopUp>
  )
}

export default ModalCambiarPassword
