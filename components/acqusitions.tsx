import { Container, Table } from "@nextui-org/react";
import { FailedAcquisitionAttempt } from "@prisma/client";
import { useEffect, useState } from "react";
import { post } from "../lib/fetch-wrapper";

type AcquisitionWithCourseAndStudentId = {
  id: number;
  course: {
    name: string;
  };
  student: {
    email: string;
  };
}

async function getAcquisitions(ids: number[]): Promise<AcquisitionWithCourseAndStudentId[]> {
  return await post('/api/acquisition', {
    ids: ids
  })
    .then(res => res.acquisitions)
}

export default function Acquisitions(
  {
    acquisitionIds
  }: {
    acquisitionIds: number[]
  }) {

  const [acquisitions, setAcquisitions] = useState<AcquisitionWithCourseAndStudentId[]>()

  useEffect(() => {
    (async () => {
      const t = await getAcquisitions(acquisitionIds)
      console.log('results: ' + t)
      setAcquisitions(t)
    })()
  }, [])

  // console.log(acquisitions)

  if (!acquisitions)
    return <p>Loading...</p>

  // console.log(acquisitions)

  return (
    <Container>
      <h6>Failed Resource Acquisitions</h6>
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