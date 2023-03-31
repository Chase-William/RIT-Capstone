import { Container, Table } from "@nextui-org/react";
import { StudentHelpRequest } from "@prisma/client";
import MyTable from "./my-table";

export default function HelpRequestTable({
  requests
}: {
  requests: Array<StudentHelpRequest>
}) {
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
            </Table.Header>
          )
        }}
        rowAdapter={(row: StudentHelpRequest) => {
          return (
            <Table.Row>
              <Table.Cell>
                <a target='_blank' href={"https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" + row.email + "&su=Help Request Response"}>
                  {row.email}
                </a>
              </Table.Cell>
              <Table.Cell>{row.description.slice(0, 15) + '...'}</Table.Cell>
              <Table.Cell>{new Date(row.created).toUTCString()}</Table.Cell>
            </Table.Row>
          )
        }}
        handleSelection={() => { }} />
    </Container>
  )
}