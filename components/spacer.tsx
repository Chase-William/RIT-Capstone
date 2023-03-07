import { Card, Spacer } from "@nextui-org/react";

export default function RAWRSpacer() {
  return (
    <Card css={{ $$cardColor: '$colors$primary', maxHeight: '5px', margin: '10px 0' }}>
      <Card.Body>
        <Spacer y={1} />
      </Card.Body>
    </Card>
  )
}