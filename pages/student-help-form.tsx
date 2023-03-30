import React from "react";
import { Input, Textarea, Button, Container, Text, Dropdown } from "@nextui-org/react"
import Layout from "../components/layout"
import utilStyles from '../styles/utils.module.css'
import StandardLayout from "../components/standard-layout"
import studentHelpFormStyles from './student-help-form.module.css'
import { ChangeEvent, useState } from "react"
import { post } from "../lib/fetch-wrapper"

export default function StudentHelpForm() {
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  
  const [selected, setSelected] = React.useState(new Set(["Course"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const handleSubmit = () => {
    console.log(email)
    console.log(description)
    console.log(selected)
    post('/api/student-help-form', {
      email: email,
      description: description,
      course: selected,
    })
  }

  return (
    <Layout>
      <Container css={{
        'mw': '650px'
      }}>
        <Text h3>Student Help Form</Text>
        <Input
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)} />
        <>
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
            // @ts-ignore
            onSelectionChange={setSelected}
          >
            <Dropdown.Item key="personality_psychology">Personality Psychology</Dropdown.Item>
            <Dropdown.Item key="abnormal_psychology">Abnormal Psychology</Dropdown.Item>
            <Dropdown.Item key="developmental_psychology">Developmental Psychology</Dropdown.Item>
            <Dropdown.Item key="psychology_101">Psychology 101</Dropdown.Item>
            <Dropdown.Item key="senior_capstone_project_1">Senior Capstone Project 1</Dropdown.Item>
            <Dropdown.Item key="senior_capstone_project_2">Senior Capstone Project 2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Textarea
            fullWidth={true}
            label="Describe the issue you're having here."
            placeholder="I misspelled my name as Chrys!"
            maxLength={2048}            
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            className={studentHelpFormStyles.submit_btn}
            onClick={handleSubmit}>
            Submit
          </Button>
        </>
      </Container>
    </Layout>
  )
}