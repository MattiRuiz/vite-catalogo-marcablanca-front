import { useState, useEffect } from 'react';
import { Button, Col, FormControl } from 'react-bootstrap';
import { createCliente, updateCliente } from '../../../Functions/ClienteFunctions';

const ClientesCRUD_popup = ({ cliente, onClienteUpdated, closePopUp }) => {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (cliente) {
      setClienteData({
        nombre: cliente.clientes.nombre || '',
        apellido: cliente.clientes.apellido || '',
        username: cliente.username || '',
        password: cliente.password || '',
      });
    }
  }, [cliente]);

  const handleGuardar = async () => {
    const dataToSend = {
      ...clienteData,
    };

    if (cliente) {
      const id = cliente.id;

      const response = await updateCliente(id, dataToSend);
      console.log('Cliente actualizado:', response);
    } else {
      const response = await createCliente(dataToSend);
      console.log('Cliente creado:', response);
    }
    onClienteUpdated();
    closePopUp();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Col xs={16} className="bg-light p-2">
      {cliente ? (
        <h4>Editar cliente</h4>
      ) : (
        <h4>Añadir cliente</h4>
      )}
      <FormControl
        type="text"
        className="mb-2"
        placeholder="nombre"
        name="nombre"
        value={clienteData.nombre}
        onChange={handleInputChange}
      />
      <FormControl
        type="text"
        className="mb-2"
        placeholder="apellido"
        name="apellido"
        value={clienteData.apellido}
        onChange={handleInputChange}
      />
      <FormControl
        type="text"
        className="mb-2"
        placeholder="username"
        name="username"
        value={clienteData.username}
        onChange={handleInputChange}
      />
      <FormControl
        type="password"
        className="mb-2"
        placeholder="password"
        name="password"
        value={clienteData.password}
        onChange={handleInputChange}
      />
      {cliente ? (
        <Button onClick={handleGuardar}>Guardar cambios</Button>
      ) : (
        <Button onClick={handleGuardar}>Crear cliente</Button>
      )}
    </Col>
  );
};

export default ClientesCRUD_popup;
