import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import visualizador from '../../Images/ayuda-visualizador.webp'
import mayorista from '../../Images/ayuda-mayorista.webp'
import reventa from '../../Images/ayuda-reventa.webp'
import ocultar from '../../Images/ayuda-ocultar.webp'
import desplegable from '../../Images/ayuda-desplegable.webp'
import contrasenia from '../../Images/ayuda-contrasenia.webp'

const Ayuda = () => {
  return (
    <>
      <Row className="justify-content-center py-5">
        <Col xs={11} sm={10} md={8} lg={7} className="mb-2">
          <h1 className="fw-bold">Centro de ayuda</h1>
          <p>
            En esta sección se encuentra las respuestas a las preguntas más
            frecuentes y guía sobre el uso de las funcionalidades principales:
          </p>
          <ol>
            <li className="mb-2 fw-bold">
              <a href="#primero" className="text-primary">
                Cómo utilizar el visualizador de precios
              </a>
            </li>
            <li className="mb-2 fw-bold">
              <a href="#segundo" className="text-primary">
                Estado de tu suscripción
              </a>
            </li>
            <li className="mb-2 fw-bold">
              <a href="#tercero" className="text-primary">
                Preguntas frecuentes
              </a>
            </li>
          </ol>
        </Col>
        <Col xs={11} sm={10} md={8} lg={7}>
          <h3 className="fw-bold mb-3" id="primero">
            1. Cómo utilizar el visualizador de precios
          </h3>
          <p>
            Para utilizar el <strong>Visualizar los precios</strong> en el
            catálogo primero debes ingresar a la opción{' '}
            <Link
              to={'/configurar-visualizacion'}
              className="fw-bold text-primary"
            >
              Visualizador de precios
            </Link>{' '}
            en el menú desplegable que se encuentra en la esquina superior
            derecha.
          </p>
          <p>El visualizador ofrece tres configuraciones:</p>
          <Image src={visualizador} className="mb-4" fluid />
          <h5 className="fw-bold">Mostrar precio mayorista</h5>
          <p>
            Permite al usuario ver los precios mayoristas de los productos. Esto
            puede ser útil para poder ver el costo de los producto.
          </p>
          <p>
            Para prevenir que los clientes de los usuarios vean el precio
            mayorista se mostrará tanto en el inicio como en el catálogo un
            mensaje de alerta recordando que esta modalidad de visualización se
            encuentra activa.
          </p>
          <Image src={mayorista} className="mb-4" fluid />
          <p>
            Para ocultar los precios se puede hacer click en el link del mensaje
            de alerta o en el visualizador de precios.
          </p>
          <h5 className="fw-bold">Mostrar precio de revendor</h5>
          <p>
            Esta opción calcula y muestra los precios de reventa en el catálogo
            digital.
          </p>
          <Image src={reventa} className="mb-4" fluid />
          <p>
            Para eso el usuario debe indicar un porcentaje de ganancia por sobre
            el producto mayorista. Así, por ejemplo, si el usuario indica un
            porcentaje de ganancia de 50% un producto de $1000 indicará en el
            catálogo que cuesta $1500. Esto permite a los usuarios indicarles
            automáticamente los precios de los productos de una manera más
            profesional.
          </p>
          <h5 className="fw-bold">Ocultar precios</h5>
          <p>
            Opción activa por defecto, que oculta todos los precios en el
            catálogo.
          </p>
          <Image src={ocultar} fluid />
          <h3 className="fw-bold mb-3 mt-5" id="segundo">
            2. Estado de tu suscripción
          </h3>
          <p>
            Consulta el estado de tu suscripción accediendo a la opción{' '}
            <Link to={'/mi-cuenta'} className="fw-bold text-primary">
              Mi cuenta
            </Link>{' '}
            en el menú desplegable.
          </p>
          <p>En la sección de suscripción encontrarás:</p>
          <ul>
            <li>
              <strong>Inicio y vencimiento:</strong> Fecha de inicio y
              vencimiento de tu suscripción.
            </li>
            <li>
              <strong>Estado:</strong> Indica si tu cuenta está activa o
              inactiva.
            </li>
          </ul>
          <p>
            Ante cualquier duda o inconveniente puedes escribirnos en la casilla
            de mensajes de la sección de{' '}
            <Link to={'/contacto'} className="fw-bold text-primary">
              Contacto
            </Link>{' '}
            para comunicarte directamente con <strong>servicio técnico</strong>.
          </p>
          <h3 className="fw-bold mb-3 mt-5" id="tercero">
            3. Preguntas frecuentes
          </h3>
          <p>Respuestas rápidas a las consultas más comunes:</p>
          <h5 className="fw-bold">¿Cómo cambio mi contraseña?</h5>
          <p>
            Para cambiar la contraseña debes ingresar a la opción{' '}
            <Link to={'/mi-cuenta'} className="fw-bold text-primary">
              Mi cuenta
            </Link>{' '}
            del menú desplegable.
          </p>
          <p>
            Una vez dentro en la parte inferior se encuentra la opción de{' '}
            <strong>¿Necesitas cambiar la contraseña?</strong>. Al hacerle click
            se abrirá un formulario para completar. Una vez finalizado solo
            resta clickear en el botón de <strong>Cambiar</strong> para poder
            aplicar los cambios.
          </p>
          <Image src={contrasenia} className="mb-4" fluid />
          <h5 className="fw-bold">¿Qué hacer si mi cuenta está inactiva?</h5>
          <p>
            Si tu cuenta está inactiva, revisa si tu suscripción ha vencido. Por
            el momento las suscripciones sólo se pueden renovar presencialmente
            en nuestro local.
          </p>
          <h5 className="fw-bold">Otras preguntas</h5>
          <p>
            Ante cualquier duda o inconveniente puedes escribirnos en la casilla
            de mensajes de la sección de{' '}
            <Link to={'/contacto'} className="fw-bold text-primary">
              Contacto
            </Link>
            .
          </p>
        </Col>
      </Row>
    </>
  )
}

export default Ayuda
