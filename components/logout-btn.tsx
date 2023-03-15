import { Button } from "@nextui-org/react";
import Cookies from 'js-cookie'
import { USER_COOKIE_NAME } from "../lib/util";

export default function LogoutButton() {
  return (
    <Button 
      onClick={() => Cookies.remove(USER_COOKIE_NAME)}
      
      size='xs'>Logout</Button>
  )
}