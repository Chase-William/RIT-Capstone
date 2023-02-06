import { Container } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Logins, { LoginWithStudentEmail } from "../components/logins";
import StandardLayout from "../components/standard-layout";
import { get } from "../lib/fetch-wrapper";
import Users, { AugmentedUser } from "../components/users";
import { useUser } from "../lib/userUser";
import NotLoggedIn from "../components/error/not-logged-in";

async function getRecentStudentLoginFailures(): Promise<LoginWithStudentEmail[]> {
  return await get('/api/login', { success: false })
    .then(res => res.logins)
}

async function getUsers(): Promise<AugmentedUser[]> {
  return await get('/api/user', null)
    .then(res => res.users)
}

export default function Accounts() {
  const user = useUser()
  const [logins, setLogins] = useState<LoginWithStudentEmail[]>()
  const [users, setUsers] = useState<AugmentedUser[]>()

  useEffect(() => {
    if (user?.isLoggedIn) {
      (async () => {
        setLogins(await getRecentStudentLoginFailures())
      })();
      (async () => {
        setUsers(await getUsers())
      })()
    }    
  }, [user])

  if (!user)
  return <NotLoggedIn/>

  if (!logins || !users)
    return <p>Loading...</p>

  return (
    <Layout>
      <StandardLayout
        topLeft={<Logins title={'Failed Logins'} logins={logins}/>}
        topRight={<p>Export Component</p>}
        bottom={
          <Users users={users}/>
        }
      />
    </Layout>
  )
}