import { Table, Dropdown } from "@nextui-org/react";

export type AugmentedUser = {
  id: number
  username: string
  email: string
  role: string
}

export default function Users({ 
  users, 
  handleSelection 
} : { 
  users: AugmentedUser[],
  handleSelection: (key: string) => void
}) {

  const handleSelectionChanged = (e: { currentKey: string }) => {
    handleSelection(e.currentKey)
  }

  return (
    <Table
      selectionMode="single"
      // @ts-ignore
      onSelectionChange={handleSelectionChanged}
      shadow={false}>
      <Table.Header>
        <Table.Column>Id</Table.Column>
        <Table.Column>Username</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Role</Table.Column>
      </Table.Header>
      {/* <Dropdown>
          <Dropdown.Button flat></Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="student">Student</Dropdown.Item>
            <Dropdown.Item key="itanalyst">IT Analyst</Dropdown.Item>
            <Dropdown.Item key="professor">Professor</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> */}
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