import { useState, useEffect } from 'react';
import { getAllClientes, deleteCliente } from '../../../Functions/ClienteFunctions';
import ClientesPopup from './ClientesCRUD_popup';
import { Col, Button } from 'react-bootstrap';

const ClientesCRUD = () => {
  const [clientes, setClientes] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const fetchData = async () => {
    try {
      const clientesResponse = await getAllClientes();
      setClientes(clientesResponse.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePopup = (cliente) => {
    setSelectedCliente(cliente);
    setPopUp(!popUp);
  };

  const handleDelete = async (idCliente) => {
    try{
      const response = await deleteCliente(idCliente)
      setPopUp(false)
      fetchData()
      return response

    }
    catch (e)
    {
      return e.message
    }
  };

  return (
    <div>
      <Col xs={12}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => handlePopup(null)}
        >
          Crear Marca
        </Button>
        <ul className="list-group mt-3">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="list-group-item d-flex justify-content-between"
            >
              {cliente.clientes.nombre} {cliente.clientes.apellido}
              <br></br>
              {cliente.username}
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => handlePopup(cliente)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(cliente.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Col>
      { 
      popUp ? 
        (
          <ClientesPopup 
          cliente={selectedCliente} 
          onClienteUpdated={() => fetchData()}
          closePopUp={() => setPopUp(!popUp)}
          />
        ) 
        : 
        (
          <></>
        ) 
      }
    </div>
  );
};

export default ClientesCRUD;
