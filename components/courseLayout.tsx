import { Card, Col, Container, Row } from '@nextui-org/react'
import utilStyles from '../styles/utils.module.css'

export default function CourseLayout(
  {
    top,
    bottom
  }: {
    top: JSX.Element,
    bottom: JSX.Element
  }) {

  // Logic

  return (
    <>
      <Container fluid>
      <Row css={{ marginTop: 20}}>
          <Card>
            <Card.Header style={{ backgroundColor:'#F6BE00', maxHeight: '5px'}}/>
            <Card.Body>
              {top}
            </Card.Body>
          </Card>
        </Row>
        <Row css={{ marginTop: 20 }}>
          <Card>
            <Card.Header style={{ backgroundColor:'#C4D600', maxHeight: '5px'}}/>
            <Card.Body>
              {bottom}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}