import { Button, Input, Text } from "@nextui-org/react";
import utilStyles from '../../styles/utils.module.css';
import { FormEvent, useState } from "react";
import { onLoggedIn } from "../../lib/util";
import { useLogin } from "../../lib/useLogin";

// async function login(username: string, password: string): Promise<User> {  
//   return await post('/api/auth/login', {    
//     username: username,
//     password: password    
//   })
// }

export default function Login() {
  const { login } = useLogin()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()   
    // Use our login functional expression from useLogin()
    const user = await login(username, password)  
    onLoggedIn(user)
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