import { Button, Input, Text } from "@nextui-org/react";
import utilStyles from '../../styles/utils.module.css';
import { FormEvent, useState } from "react";
import axios from "axios";
import { ADMIN_ROLE, PROF_ROLE, User } from "../../pages/api/user";
import { onLoggedIn, setToken } from "../../lib/util";
import { post } from "../../lib/fetch-wrapper";

export type LoginRequest = {
  user: User
  apiKey: string
}

async function login(username: string, password: string): Promise<LoginRequest> {  
  return await post('/api/auth/login', {    
    username: username,
    password: password    
  })
}

export default function Login({
  setUser
}: {
  setUser: (user: User) => void
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await login(username, password)
    setToken(result.apiKey)
    setUser(result.user)
    onLoggedIn(result.user)
  }  

  return (
    <form onSubmit={handleSubmit}>
      <div className={utilStyles.vertical}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Login
        </Text>
        <Input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <Input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        <Button type="submit">Login</Button>
      </div>
    </form >
  )
}