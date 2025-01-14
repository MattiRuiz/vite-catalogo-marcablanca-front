import { Col, Placeholder, Ratio, Card } from 'react-bootstrap'

function CardLoading() {
  return (
    <Card className="mb-3 h-100">
      <Ratio aspectRatio="1x1" className="rounded-2">
        <Placeholder
          as={Card.Img}
          className="fondo-imagen rounded-2 rounded-bottom-0"
        />
      </Ratio>
      <Card.Body className="pb-1">
        <Placeholder as={Card.Title} animation="glow" className="pb-1">
          <Placeholder xs={10} />
        </Placeholder>
        <Placeholder
          as={Card.Subtitle}
          animation="glow"
          className="text-muted pb-2"
        >
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow" className="mb-0">
          <Placeholder xs={1} /> <Placeholder xs={4} />{' '}
        </Placeholder>
      </Card.Body>
    </Card>
  )
}

export default CardLoading
