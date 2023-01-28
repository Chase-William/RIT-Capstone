import { Container, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { post } from "../lib/fetch-wrapper";

export type AugmentedAcquisition = {
  id: number;
  student: {
    id: number,
    email: string;
  };
  course: {
    id: number,
    name: string;
  };
}

export default function Acquisitions(
  {
    acquisitions,
    title
  }: {
    acquisitions: AugmentedAcquisition[],
    title: string
  }) {

  if (!acquisitions)
    return <p>Loading...</p>

  return (
    <Container>
      <h6>{title}</h6>
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
              <Table.Cell>{acquisition.student.email}</Table.Cell>
              <Table.Cell>{acquisition.course.name}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}