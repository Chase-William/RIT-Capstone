import { Container } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import FailedLogins from "../components/logins";
import StandardLayout from "../components/standard-layout";



export default function Accounts() {

  return (
    <Layout>
      <StandardLayout
        topLeft={<FailedLogins studentIds={undefined}/>}
        topRight={<p>Export Component</p>}
        bottom={
          <p>Accounts Component</p>
        }
      />
    </Layout>
  )
}