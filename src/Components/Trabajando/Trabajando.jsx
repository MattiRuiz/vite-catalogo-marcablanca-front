import { Image } from 'react-bootstrap'

import trabajando from './trabajando.png'

function Trabajando() {
  return (
    <div className="py-5 text-center">
      <Image src={trabajando} className="mb-2" />
      <h1>Próximamente...</h1>
      <p>Nos encontramos trabajando para mejorar la experiencia del usuario.</p>
    </div>
  )
}

export default Trabajando
