import { Button, Input, Text } from "@nextui-org/react";
import utilStyles from '../../styles/utils.module.css';
import { FormEvent, useState } from "react";
import { onLoggedIn } from "../../lib/util";
import { useLogin } from "../../lib/useLogin";

export default function Login() {
  const { login } = useLogin()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()   
    // Use our login functional expression from useLogin()
    const user = await login(username, password)  
    if (!user)
      return
    onLoggedIn(user)
  }  

  return (
    <form onSubmit={handleSubmit}>
      <div className={utilStyles.vertical}>
        <Text size={60}>
          Login
        </Text>
        <Input 
          placeholder="Username" 
          onChange={e => setUsername(e.target.value)} 
        />
        <Input.Password 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)}
        />
        <Button 
          type="submit">
          Login
        </Button>
      </div>
    </form >
  )
}