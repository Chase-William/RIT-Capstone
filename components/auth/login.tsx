import { Button, Input, Text } from "@nextui-org/react";
import utilStyles from '../../styles/utils.module.css';
import { FormEvent, useState } from "react";
import axios from "axios";
import { User } from "../../pages/api/user";

export type LoginRequest = {
  user: User
  apiKey: string
}

async function login(username: string, password: string): Promise<LoginRequest> {  
  return axios({
    method: 'POST',
    url: '/api/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username: username,
      password: password
    }
  })
  .then(res => res.data)  
}

export default function Login({
  setUser,
  setApiKey
}: {
  setUser: (user: User) => void,
  setApiKey: (apiKey: string) => void
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await login(username, password)
    setUser(result.user)
    setApiKey(result.apiKey)
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