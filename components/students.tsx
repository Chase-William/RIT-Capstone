import { Container } from "@nextui-org/react"
import MyTable from "./my-table"

export default function Students(
  {
    students,
    title,
    headerAdapter,
    rowAdapter
  }: {
    students: Array<any>,
    title: string,
    headerAdapter: () => JSX.Element,
    rowAdapter: (item: any) => JSX.Element
  }) {

  if (!students)
    return <p>Loading...</p>

  return (
    <Container>
      <h6>{title}</h6>
      <MyTable
        col={students}
        headerAdapter={headerAdapter}
        rowAdapter={rowAdapter}
      />
    </Container>
  )
}