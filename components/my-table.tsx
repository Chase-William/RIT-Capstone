import { Table } from "@nextui-org/react";

export default function MyTable({
  col,
  headerAdapter,
  rowAdapter
}: {
  col: Array<any>,
  headerAdapter: () => JSX.Element,
  rowAdapter: (acqusition: any) => JSX.Element
}) {
  return (
    <Table
      shadow={false}>
      {headerAdapter()}
      <Table.Body>
        {col.map(item =>
          rowAdapter(item)
        )}
      </Table.Body>
      {col.length > 5 &&
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={5}
        />
      }
    </Table>
  )
}