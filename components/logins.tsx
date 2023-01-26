import { Container, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { get, post } from "../lib/fetch-wrapper";

type LoginWithStudentEmail = {
  id: number;
  student: {
    email: string;
  };
  login_timestamp: string;
}

async function getRecentStudentLoginFailures(): Promise<LoginWithStudentEmail[]> {
  return await get('/api/failed-login')
    .then(res => res.logins)
}

async function getLogins(ids: number[]): Promise<LoginWithStudentEmail[]> {
  return await post('/api/failed-login', {
    ids: ids
  })
    .then(res => res.logins)
}

export default function FailedLogins(
  {
    studentIds
  }: {
    studentIds: number[] | null | undefined
  }) {

  const [logins, setLogins] = useState<LoginWithStudentEmail[]>()

  useEffect(() => {
    if (studentIds) {
      (async () => {
        setLogins(await getLogins(studentIds))
      })() 
    } else {
      (async () => {
        setLogins(await getRecentStudentLoginFailures())
      })
    }
  }, [])

  if (!logins)
    return <p>Loading...</p>

  console.log(logins)

  return (
    <Container>
      <h6>Failed Logins</h6>
      <Table>
        <Table.Header>
          <Table.Column>Id</Table.Column>
          <Table.Column>Student</Table.Column>
          <Table.Column>Timestamp</Table.Column>
        </Table.Header>
        <Table.Body>
          {logins.map((login) =>
            <Table.Row key={login.id}>
              <Table.Cell>{login.id}</Table.Cell>
              <Table.Cell>{login.student.email}</Table.Cell>
              <Table.Cell>{login.login_timestamp}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}