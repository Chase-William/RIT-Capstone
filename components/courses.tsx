import { Button, Card, Container, Row, Table } from "@nextui-org/react";
import { Course } from "@prisma/client";
import Link from "next/link";
import Router, { withRouter } from "next/router";

export default function Courses({ courses }: { courses: Course[] }) {
  // Handle click and navigate to course
  const handleSelected = (e: { currentKey: string }) => {
    Router.push(`/course/${e.currentKey}`)
  }

  return (
    <Container>
      <Row>
        <h3>Courses:</h3>
      </Row>
      <Row fluid css={{
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      </Row>
      <Row
        css={{
          marginTop: 20,
          display: 'block',
          minWidth: '100%'
        }}
        fluid>
        <Table
          selectionMode="single"
          shadow={false}
          css={{
            padding: 0
          }}
          //@ts-ignore
          onSelectionChange={handleSelected}>
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