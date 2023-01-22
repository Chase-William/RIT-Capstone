import { Button, Input, Text } from "@nextui-org/react";
import utilStyles from '../../styles/utils.module.css';
import { FormEvent } from "react";

export default function Login({
  errorMessage,
  onSubmit
}: {
  errorMessage: String,
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <div className={utilStyles.vertical}>
      <form onSubmit={onSubmit}>
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
        <Input name="username" placeholder="Username" />
        <Input name="password" placeholder="Password" />
        <Button type="submit">Login</Button>

        {/* Display error message if not falsey*/}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}