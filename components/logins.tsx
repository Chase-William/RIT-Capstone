import { Container, Table } from "@nextui-org/react";
import MyTable from "./my-table";
import { LoginAttempt } from "@prisma/client";

export type LoginWithStudentEmail = {
  id: number;
  status: boolean;
  student: {
    email: string;
  };
  login_timestamp: string;
}

export default function Logins(
  {
    logins,
    title,
    headerAdapter,
    rowAdapter,
    handleSelection
  }: {
    logins: Array<any>,
    title: string,
    headerAdapter: () => JSX.Element,
    rowAdapter: (acqusition: any) => JSX.Element,
    handleSelection: (key: string) => void
  }) {

  if (!logins)
    return <p>Loading...</p>

  // console.log(logins.length)

  return (
    <Container>
      <h6>{title}</h6>
      <MyTable
        handleSelection={handleSelection}
        col={logins}
        headerAdapter={headerAdapter}
        rowAdapter={rowAdapter}
      />
    </Container>
  )
}

export const defaultLoginHeaderAdapter = () => {
  return (
    <Table.Header>
      <Table.Column>Id</Table.Column>
      <Table.Column>Timestamp</Table.Column>
    </Table.Header>
  )
}

export const defaultLoginRowAdapter = (v: LoginAttempt) => {
  return (
    <Table.Row>
      <Table.Cell>{v.id}</Table.Cell>
      <Table.Cell>{v.login_timestamp.toUTCString()}</Table.Cell>
    </Table.Row>
  )
}