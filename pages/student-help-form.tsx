import { Input, Textarea, Button, Container, Text } from "@nextui-org/react"
import Layout from "../components/layout"
import utilStyles from '../styles/utils.module.css'
import StandardLayout from "../components/standard-layout"
import studentHelpFormStyles from './student-help-form.module.css'
import { ChangeEvent, useState } from "react"

export default function StudentHelpForm() {
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    console.log(email)
    console.log(description)
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