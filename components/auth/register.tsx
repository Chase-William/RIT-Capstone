import React, { FormEvent, useState } from "react";
import { Input, Dropdown, Button, Text } from "@nextui-org/react";
import utilStyles from '../../styles/utils.module.css';
import { ADMIN_ROLE, PROF_ROLE, User } from "../../pages/api/user";
import axios from "axios";
import { LoginRequest } from "./login";
import Router from "next/router";
import { onLoggedIn } from "../../lib/util";

async function register(
  username: string, 
  password: string,
  email: string,
  role: string
  ): Promise<LoginRequest> {
  try {
    return axios({
      method: 'POST',
      url: '/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        password: password,
        email: email,
        role: role
      }
    })
    .then(res => res.data)
  }
  catch (error) {
    console.log(error.response.data)
  }  
}

export default function Register({
  setUser
}: {
  setUser: (user: User) => void
}) {
  const [selected, setSelected] = useState(new Set(["student"]));
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const getRole = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  /**
   * Use this handler to pass in the extra role argument
   */
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await register(username, password, email, getRole)
    setUser(result.user)
    onLoggedIn(result.user)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={utilStyles.vertical}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Register
        </Text>
        <Input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <Input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        <Input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        <Dropdown>
          <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
            {getRole}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            // @ts-ignore
            onSelectionChange={setSelected}
          >
            <Dropdown.Item key="student">Student</Dropdown.Item>
            <Dropdown.Item key="professor">Professor</Dropdown.Item>
            <Dropdown.Item key="admin">Admin</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button type="submit">Register</Button>
      </div>
    </form>
  )
}

// export default function SignUp({
//   errorMessage,
//   onSubmit
// }: {
//   errorMessage: String,
//   onSubmit: (e: FormEvent<HTMLFormElement>, role: String) => void
// }) {
//   const [selected, setSelected] = React.useState(new Set(["student"]));

//   const selectedValue = React.useMemo(
//     () => Array.from(selected).join(", ").replaceAll("_", " "),
//     [selected]
//   );

//   /**
//    * Use this handler to pass in the extra role argument
//    */
//   const submitHandler = (e: FormEvent<HTMLFormElement>) => {
//     onSubmit(e, selectedValue)
//   }

//   return (
//     <form onSubmit={submitHandler}>
//       <div className={utilStyles.vertical}>
//         <Text
//           h1
//           size={60}
//           css={{
//             textGradient: "45deg, $blue600 -20%, $pink600 50%",
//           }}
//           weight="bold"
//         >
//           Register
//         </Text>
//         <Input name="username" placeholder="Username" />
//         <Input name="password" placeholder="Password" />
//         <Input name="email" placeholder="Email" />
//         <Dropdown>
//           <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
//             {selectedValue}
//           </Dropdown.Button>
//           <Dropdown.Menu
//             aria-label="Single selection actions"
//             color="secondary"
//             disallowEmptySelection
//             selectionMode="single"
//             selectedKeys={selected}
//             // @ts-ignore
//             onSelectionChange={setSelected}
//           >
//             <Dropdown.Item key="student">Student</Dropdown.Item>
//             <Dropdown.Item key="professor">Professor</Dropdown.Item>
//             <Dropdown.Item key="admin">Admin</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//         <Button type="submit">Register</Button>

//         {/* Display error message if not falsey*/}
//         {errorMessage && <p>{errorMessage}</p>}
//       </div>
//     </form>
//   )
// }