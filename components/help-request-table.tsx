import { Container, Table } from "@nextui-org/react";
import { StudentHelpRequest } from "@prisma/client";
import MyTable from "./my-table";
import Router from "next/router";

export default function HelpRequestTable({
  requests
}: {
  requests: Array<StudentHelpRequest>
}) {
  const handleSelected = (key: string) => {
    Router.push(`/student-help/${key}`)
  }

  return (
    <Container>
      <MyTable
        col={requests}
        headerAdapter={() => {
          return (
            <Table.Header>
              <Table.Column>Email</Table.Column>
              <Table.Column>Description</Table.Column>
              <Table.Column>Created</Table.Column>
              <Table.Column>Resolved</Table.Column>
            </Table.Header>
          )
        }}
        rowAdapter={(row: StudentHelpRequest) => {
          return (
            <Table.Row key={row.id}>
              <Table.Cell>
                <a target='_blank' href={"https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" + row.email + "&su=Help Request Response"}>
                  {row.email}
                </a>
              </Table.Cell>
              <Table.Cell>{row.description.slice(0, 15) + '...'}</Table.Cell>
              <Table.Cell>{new Date(row.create).toUTCString()}</Table.Cell>
              <Table.Cell>{row.isResolved.toString()}</Table.Cell>
            </Table.Row>
          )
        }}
        handleSelection={handleSelected} />
    </Container>
  )
}