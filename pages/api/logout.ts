import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '../../pages/api/user'

/*
  Logout the user and destroy the session.
*/
function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy()
  res.json({ isLoggedIn: false, username: '', role: '', id: -1 })
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)