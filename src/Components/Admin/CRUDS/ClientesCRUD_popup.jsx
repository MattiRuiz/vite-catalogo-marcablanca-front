import { useState, useEffect } from 'react';
import { Button, Col, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { createCliente, updateCliente } from '../../../Functions/ClienteFunctions';

const ClientesCRUD_popup = ({ cliente, onClienteUpdated, closePopUp }) => {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
  });

    //#region UseEffect
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
    //#endregion

    //#region Handle guardar cambios (CREAR O EDITAR)
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
    //#endregion
  
    //#region Handle de todos los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClienteData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    //#endregion
  
    return (
    <Modal centered show={true}>
    <Modal.Header>
      { cliente ? <h4>Editar cliente</h4> : <h4>Añadir cliente</h4> }
    </Modal.Header>

    <Modal.Body>
      
      <FormGroup>
        <FormControl
            type="text"
            className="mb-2"
            placeholder="Nombre"
            name="nombre"
            value={clienteData.nombre}
            onChange={handleInputChange}
        />
        
        <FormControl
            type="text"
            className="mb-2"
            placeholder="Apellido"
            name="apellido"
            value={clienteData.apellido}
            onChange={handleInputChange}
        />
        
        <FormControl
            type="text"
            className="mb-2"
            placeholder="Username"
            name="username"
            value={clienteData.username}
            onChange={handleInputChange}
        />
        
        <FormControl
            type="password"
            className="mb-2"
            placeholder="Password"
            name="password"
            value={clienteData.password}
            onChange={handleInputChange}
        />
      </FormGroup>

        { cliente ? 
            <Button onClick={handleGuardar}>Guardar cambios</Button>
            :
            <Button onClick={handleGuardar}>Crear cliente</Button>
        }

      <Button className='m-2' onClick={() => closePopUp()}>Canclear</Button>
    </Modal.Body>

    </Modal>
  );
};

export default ClientesCRUD_popup;
