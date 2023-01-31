import { Card, Col, Container, Row } from '@nextui-org/react'
import utilStyles from '../styles/utils.module.css'

export default function StandardLayout(
  {
    topLeft,
    topRight,
    bottom
  }: {
    topLeft: JSX.Element,
    topRight: JSX.Element,
    bottom: JSX.Element
  }) {

  // Logic

  return (
    <>
      <Container fluid>
        <Row css={{ columnGap: 20 }}>
          <Col
            css={{ textAlign: 'center' }}>
            <Card>
              <Card.Body>
                {topLeft}
              </Card.Body>
            </Card>
          </Col>
          <Col
            css={{ textAlign: 'center' }}>
            <Card>
              <Card.Body>
                {topRight}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row css={{marginTop: 20}}>
          <Card>
            <Card.Body>
              {bottom}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}