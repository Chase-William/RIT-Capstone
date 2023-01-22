import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

/*
  Used as the generic user object omitting fields like password.
*/
export type User = {
  isLoggedIn: boolean
  username: String
  role: String
  id: number
}

export const PROF_ROLE = 'prof'
export const ADMIN_ROLE = 'admin'

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({ // Successful Login
      ...req.session.user,
      isLoggedIn: true,
    })
  } else { // Failed Login
    res.json({
      isLoggedIn: false,
      username: '',
      role: '',
      id: -1
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)