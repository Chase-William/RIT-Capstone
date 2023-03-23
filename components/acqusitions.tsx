import { Container, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { post } from "../lib/fetch-wrapper";
import { AcquisitionAttempt } from "@prisma/client";
import MyTable from "./my-table";
import { useAsyncList, useCollator } from "@nextui-org/react";

export type AugmentedAcquisition = {
  id: number;
  status: boolean;
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
    acquisitions: Array<any>,
    title: string,
    headerAdapter: () => JSX.Element,
    rowAdapter: (acqusition: any) => JSX.Element
  }) {

  if (!acquisitions)
    return <p>Loading...</p>

  //added
  const collator = useCollator({ numeric: true });
 /* async function load({ signal }) {
    const res = await fetch("https://swapi.py4e.com/api/people/?search", {
      signal,
    });
    const json = await res.json();
    return {
      items: json.results,
    };
  }*/
  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }
  const list = useAsyncList({ acquisitions, sort });


  return (
    <Container>
      <h6>{title}</h6>
      <MyTable
        handleSelection={null}
        col={acquisitions}
        headerAdapter={headerAdapter}
        rowAdapter={rowAdapter}
      
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
            
      />
    </Container>
  )
}