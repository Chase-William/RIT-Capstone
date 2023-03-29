import { StudentHelpRequest } from "@prisma/client";
import { useEffect, useState } from "react";
import Login from "../components/auth/login";
import NotLoggedIn from "../components/error/not-logged-in";
import Layout from "../components/layout";
import { get } from "../lib/fetch-wrapper";
import { useUser } from "../lib/userUser";
import HelpRequestTable from '../components/help-request-table';

async function getStudentHelpRequest(): Promise<Array<StudentHelpRequest>> {
  return await get('/api/student-help-form', {})
    .then(data => data.requests)
}

export default function Stats() {
  const user = useUser()
  const [requests, setRequests] = useState<Array<StudentHelpRequest>>([])

  useEffect(() => {
    (async () => {
      setRequests(await getStudentHelpRequest())
    })()
  }, [])

  if (!user?.isLoggedIn)
    return NotLoggedIn()

  if (!requests)
    return <p>Loading...</p>

  console.log(requests)

  return (
    <Layout>
      <HelpRequestTable requests={requests}/>
    </Layout>
  )
}