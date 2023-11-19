import { useState, useEffect } from 'react';
import { getAllTipoProductos, deleteTipoProducto } from '../../../../Functions/TipoProductosFunctions';
import TipoProductosPopUp from './TipoProductoCRUD_popup';
import { Col, Button } from 'react-bootstrap';

const TipoProductoCRUD = () => {
  //#region Declaracion useState's
  const [tipoProductos, setTipoProductos] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedTipoProducto, setSelectedTipoProducto] = useState(null);
  //#endregion
  
  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const tallasRespone = await getAllTipoProductos();
      setTipoProductos(tallasRespone.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //#endregion
  
  const openPopup = (tipoProducto) => {
    setSelectedTipoProducto(tipoProducto);
    setPopUp(true);
  };
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idTipoProducto) => {
    try{
      const response = await deleteTipoProducto(idTipoProducto)
      console.log('Tipo producto eliminado', response)
      setPopUp(false)
    }
    catch (e)
    {
      return e.message
    }
    fetchData();
  };
  //#endregion

  return (
    <div>
      <Col >
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear Talla
        </Button>
        <ul className="list-group mt-3">
          {tipoProductos.map((tipoProducto) => (
            <li
              key={tipoProducto.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div className='m-0 p-0'>
                {tipoProducto.nombre}
                {tipoProducto.dimensiones}
              </div>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(tipoProducto)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(tipoProducto.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Col>
        {  
        //#region Renderizado condicional PopUp
        popUp ? (
          <TipoProductosPopUp 
          tipoProducto={selectedTipoProducto} 
          onTipoProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUp(false)}
          />
        ) 
        : 
        (
          <>
          </>
        )
        //#endregion
        }
    </div>
  );
};

export default TipoProductoCRUD;
