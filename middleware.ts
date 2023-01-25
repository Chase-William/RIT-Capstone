/**
 * This files purpose is to decode the incoming JWT from users to ensure validity.
 * Once decoded, the id of the user can be extracted from the payload section and
 * used.
 * 
 * https://nextjs.org/docs/advanced-features/middleware
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from './lib/jwt'

export const USER_ID_HEADER_NAME = 'user-id'

export async function middleware(request: NextRequest) {
  const AUTH_HEADER = 'Authorization'
  console.log('middleware')
  console.log(request.headers)
  
  if (!request.headers.has(AUTH_HEADER))
    return NextResponse.next({
      status: 400,
      statusText: 'Missing <Authorization> token in request header.'
    })

  const authHeader = request.headers.get(AUTH_HEADER);
  console.log('authheader: ' + authHeader)
  if (authHeader) {
    console.log('-------------------------------------------------')
    const token = await verify(authHeader.split(' ')[1], process.env.JWT_PRIVATE_KEY);
    request.headers.set(USER_ID_HEADER_NAME, token.id)    
  }
}

/**
 * Middleware shall run on the routes listed below:
 */
export const config = {
  matcher: [
    '/api/course'
  ]
}