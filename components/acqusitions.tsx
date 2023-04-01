import { Container, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { post } from "../lib/fetch-wrapper";
import { AcquisitionAttempt } from "@prisma/client";
import MyTable from "./my-table";

export type AugmentedAcquisition = {
  id: number;
  status: boolean;
  start_time: string;
  url: string;
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
    rowAdapter,
    handleSelection
  }: {
    acquisitions: Array<any>,
    title: string,
    headerAdapter: () => JSX.Element,
    rowAdapter: (acqusition: any) => JSX.Element
    handleSelection: (key: string) => void
  }) {

  if (!acquisitions)
    return <p>Loading...</p>

  return (
    <Container>
      <h6>{title}</h6>
      <MyTable
        handleSelection={handleSelection}
        col={acquisitions}
        headerAdapter={headerAdapter}
        rowAdapter={rowAdapter}
      />
    </Container>
  )
}