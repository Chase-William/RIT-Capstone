import { Input, Textarea, Button } from "@nextui-org/react"
import Layout from "../components/layout"
import utilStyles from '../styles/utils.module.css'
import StandardLayout from "../components/standard-layout"
import studentHelpFormStyles from './student-help-form.module.css'

export default function StudentHelpForm() {
  return (
    <Layout>
      <StandardLayout
        topLeft={
          <div className={`${utilStyles.vertical}`}>
            <Input placeholder="First Name"/>
            <Input placeholder="Last Name"/>        
          </div>
        }
        topRight={
          <div className={`${utilStyles.vertical}`}>
            <Input placeholder="Your Email"/>
            <Input placeholder="Your Class"/>
          </div>  
        }
        bottom={
          <>
            <Textarea
              fullWidth={true}
              label="Describe the issue you're having here."
              placeholder="I misspelled my name as Chrys!"
            />
            <Button className={studentHelpFormStyles.submit_btn}>
              Submit
            </Button>
          </>
        }
      />              
    </Layout>
  )
}