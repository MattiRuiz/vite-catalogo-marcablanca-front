import { Modal, Button, Form } from 'react-bootstrap'

const ModalCreate = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group>
            <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre de usuario"
                value={formData.username || ""}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Contraseña"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Apellido"
                value={formData.apellido || ""}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />
            </Form.Group>
            <Button className="my-3" onClick={handleCreate}>
              Guardar
            </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalCreate
