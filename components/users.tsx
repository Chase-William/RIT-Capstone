import { Table } from "@nextui-org/react";

export type AugmentedUser = {
  id: number
  username: string
  email: string
  role: string
}

export default function Users({ users }: { users: AugmentedUser[] }) {
  return (
    <Table
      shadow={false}>
      <Table.Header>
        <Table.Column>Id</Table.Column>
        <Table.Column>Username</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Role</Table.Column>
      </Table.Header>
      <Table.Body>
        {users.map(user =>
          <Table.Row key={user.id}>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={5}
        />
    </Table>
  )
}