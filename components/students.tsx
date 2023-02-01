import { Container, Table } from "@nextui-org/react"

export default function Students(
  {
    students,
    title,
    headerAdapter,
    rowAdapter
  }: {
    students: any,
    title: string,
    headerAdapter: () => JSX.Element,
    rowAdapter: (acqusition: any) => JSX.Element
  }) {

  if (!students)
    return <p>Loading...</p>

  return (
    <Container>
      <h6>{ title }</h6>
      <Table>
        { headerAdapter() }
        <Table.Body>
          {students.map(stud =>
            rowAdapter(stud)
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}