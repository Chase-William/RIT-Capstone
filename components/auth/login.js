import { Button, Input, Text } from "@nextui-org/react";

import utilStyles from '../../styles/utils.module.css';
import authStyles from './utils.module.css';

export default function Login(){
  return (
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
      <Input placeholder="Username"/>
      <Input placeholder="Password"/>
      <Button>Login</Button>
    </div>
  )
}