import { Table } from "@nextui-org/react";
import { FailedAcquisitionAttempt } from "@prisma/client";

export default function Acquisitions(
  {
    acquisitions
  }: {
    acquisitions: FailedAcquisitionAttempt[]
  }) {
  return (
    <Table>
      <Table.Header>
        <Table.Column>Id</Table.Column>
        <Table.Column>Student</Table.Column>
        <Table.Column>Course</Table.Column>
      </Table.Header>
      <Table.Body>
        {acquisitions.map((acquisition) =>
          <Table.Row key={acquisition.id}>
            <Table.Cell>{acquisition.id}</Table.Cell>
            <Table.Cell>{acquisition.}</Table.Cell>
            <Table.Cell>{acquisition}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}