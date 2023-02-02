import { Container, Table } from "@nextui-org/react";
import MyTable from "./my-table";

export type LoginWithStudentEmail = {
  id: number;
  student: {
    email: string;
  };
  login_timestamp: string;
}

export default function Logins(
  {
    logins,
    title
  }: {
    logins: LoginWithStudentEmail[],
    title: string
  }) {

  if (!logins)
    return <p>Loading...</p>

  // console.log(logins.length)

  return (
    <Container>
      <h6>{title}</h6>
      <MyTable
        col={logins}
        headerAdapter={() => {
          return (
            <Table.Header>
              <Table.Column>Id</Table.Column>
              <Table.Column>Student</Table.Column>
              <Table.Column>Timestamp</Table.Column>
            </Table.Header>
          )
        }}
        rowAdapter={(login: LoginWithStudentEmail) => {
          return (
            <Table.Row key={login.id}>
              <Table.Cell>{login.id}</Table.Cell>
              <Table.Cell>{login.student.email}</Table.Cell>
              <Table.Cell>{login.login_timestamp}</Table.Cell>
            </Table.Row>
          )
        }}
      />
    </Container>
  )
}