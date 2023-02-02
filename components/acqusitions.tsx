import { Container, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { post } from "../lib/fetch-wrapper";
import { AcquisitionAttempt } from "@prisma/client";

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
    title,
    headerAdapter,
    rowAdapter
  }: {
    acquisitions: any,
    title: string,
    headerAdapter: () => JSX.Element,
    rowAdapter: (acqusition: any) => JSX.Element
  }) {

  if (!acquisitions)
    return <p>Loading...</p>

  return (
    <Container>
      <h6>{title}</h6>
      <Table
        shadow={false}>
        {headerAdapter()}
        <Table.Body>
          {acquisitions.map(acq =>
            rowAdapter(acq)
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={5}
        />
      </Table>
    </Container>
  )
}