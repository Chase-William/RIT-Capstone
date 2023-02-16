import { Container } from "@nextui-org/react"
import MyTable from "./my-table"

export default function Students(
  {
    students,
    title,
    headerAdapter,
    rowAdapter,
    handleSelection
  }: {
    students: Array<any>,
    title: string,
    headerAdapter: () => JSX.Element,
    rowAdapter: (item: any) => JSX.Element,
    handleSelection: (key: string) => void
  }) {

  if (!students)
    return <p>Loading...</p>

  return (
    <Container>
      <h6>{title}</h6>
      <MyTable
        handleSelection={handleSelection}
        col={students}
        headerAdapter={headerAdapter}
        rowAdapter={rowAdapter}
      />
    </Container>
  )
}