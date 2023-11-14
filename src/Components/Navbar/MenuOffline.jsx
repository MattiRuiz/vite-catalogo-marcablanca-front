import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

function MenuOffline({ close }) {
  return (
    <Offcanvas.Body>
      <ul className="list-unstyled">
        <li>
          <Link to={"/login"} onClick={close}>
            Ingresar
          </Link>
        </li>
      </ul>
    </Offcanvas.Body>
  );
}

export default MenuOffline;
