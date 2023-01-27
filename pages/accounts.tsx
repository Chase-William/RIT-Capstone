import { Container } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import FailedLogins, { LoginWithStudentEmail } from "../components/logins";
import StandardLayout from "../components/standard-layout";
import { get } from "../lib/fetch-wrapper";

async function getRecentStudentLoginFailures(): Promise<LoginWithStudentEmail[]> {
  return await get('/api/failed-login')
    .then(res => res.logins)
}

export default function Accounts() {
  const [logins, setLogins] = useState<LoginWithStudentEmail[]>()

  useEffect(() => {
    (async () => {
      setLogins(await getRecentStudentLoginFailures())
    })()
  }, [])

  if (!logins)
    return <p>Loading...</p>
  console.log(logins)

  return (
    <Layout>
      <StandardLayout
        topLeft={<FailedLogins logins={logins}/>}
        topRight={<p>Export Component</p>}
        bottom={
          <p>Accounts Component</p>
        }
      />
    </Layout>
  )
}