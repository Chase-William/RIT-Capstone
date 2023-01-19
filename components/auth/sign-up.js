import React from "react";
import { Input, Dropdown, Button, Text } from "@nextui-org/react";
import utilStyles from '../../styles/utils.module.css';
import authStyles from './utils.module.css';

export default function SignUp() {
  const [selected, setSelected] = React.useState(new Set(["student"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

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
        Register
      </Text>
      <Input placeholder="Username" />
      <Input placeholder="Password" />
      <Input placeholder="Email" />
      <Dropdown>
        <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
          {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Dropdown.Item key="student">Student</Dropdown.Item>
          <Dropdown.Item key="professor">Professor</Dropdown.Item>
          <Dropdown.Item key="admin">Admin</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button>Register</Button>
    </div>
  )
}