import React from "react";
import { Input, Textarea, Button, Container, Text, Dropdown } from "@nextui-org/react"
import Layout from "../components/layout"
import studentHelpFormStyles from './student-help-form.module.css'
import { ChangeEvent, useState } from "react"
import { post } from "../lib/fetch-wrapper"

export default function StudentHelpForm() {
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const [selected, setSelected] = React.useState(new Set(["Course"]));

  const [submitted, setSubmitted] = useState(false)

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const handleSubmit = async () => {
    console.log(email)
    console.log(description)
    console.log(selectedValue)

    if (selectedValue === 'Course')
      return

    await post('/api/student-help-form', {
      email: email,
      description: description,
      course: selectedValue,
    })
    setSubmitted(true)
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
            <Dropdown.Button
              flat
              color="secondary"
              css={{
                tt: "capitalize",
                marginTop: '10px',
                zIndex: 0
              }}>
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
              <Dropdown.Item key="Personality Psychology">Personality Psych</Dropdown.Item>
              <Dropdown.Item key="Abnormal Psychology">Abnormal Psych</Dropdown.Item>
              <Dropdown.Item key="Developmental Psychology">Developmental Psych</Dropdown.Item>
              <Dropdown.Item key="Psychology 101">Psych 101</Dropdown.Item>
              <Dropdown.Item key="Senior Capstone Project 1">Senior Capstone 1</Dropdown.Item>
              <Dropdown.Item key="Senior Capstone Project 2">Senior Capstone 2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Textarea
            fullWidth={true}
            label="Describe the issue you're having here."
            placeholder="I misspelled my name as Chrys!"
            maxLength={2048}
            onChange={(e) => setDescription(e.target.value)}
          />
          {submitted ?
            <Text h4 color="success" css={{
              textAlign: 'center',
              marginTop: '10px',
            }}>
              Submission Successful
            </Text>
            :
            <Button
              className={studentHelpFormStyles.submit_btn}
              onPress={handleSubmit}>
              Submit
            </Button>
          }
        </>
      </Container>
    </Layout>
  )
}