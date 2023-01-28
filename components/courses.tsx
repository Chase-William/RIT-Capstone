import { Button, Card, Container, Row, Table } from "@nextui-org/react";
import { Course } from "@prisma/client";

export default function Courses({ courses }: { courses: Course[] }) {
  return (
    <Container>
      <Row>
        <h6>Courses:</h6>
      </Row>
      <Row fluid css={{
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button>Export</Button>
        <Card
          variant="flat"
          css={{ padding: 0, maxWidth: 200 }}>
          <Card.Body
            css={{ padding: 5, textAlign: 'center' }}>
            ?????????????????????
          </Card.Body>
        </Card>
      </Row>
      <Row
        css={{
          marginTop: 20,
          display: 'block',
          minWidth: '100%'                    
        }}
        fluid>
        <Table>
          <Table.Header>
            <Table.Column>Id</Table.Column>
            <Table.Column>Name</Table.Column>
          </Table.Header>
          <Table.Body>
            {courses.map((course) =>
              <Table.Row key={course.id}>
                <Table.Cell>{course.id}</Table.Cell>
                <Table.Cell>{course.name}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Row>
    </Container>
  )
}