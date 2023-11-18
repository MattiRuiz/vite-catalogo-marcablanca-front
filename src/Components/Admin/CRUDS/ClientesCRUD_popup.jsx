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
    <Col xs={5} className="bg-light p-2 mt-4 ">

    { cliente ? <h4>Editar cliente</h4> : <h4>Añadir cliente</h4> }

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
    
    {
    cliente ? 
        <Button onClick={handleGuardar}>Guardar cambios</Button>
        :
        <Button onClick={handleGuardar}>Crear cliente</Button>
    }
        <Button className='m-2' onClick={() => closePopUp()}>Canclear</Button>

    </Col>
  );
};

export default ClientesCRUD_popup;
