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
  /*
  
  Information about this approach for setting headers: https://github.com/vercel/next.js/pull/41380
  
  */
  
  const AUTH_HEADER = 'authorization'
  
  // Clone request headers
  const headers = new Headers(request.headers);

  if (!headers.has(AUTH_HEADER))
    return NextResponse.next({
      status: 400,
      statusText: 'Missing <Authorization> token in request header.'
    })

  const authHeader = request.headers.get(AUTH_HEADER);

  // console.log('Middleware - authheader: ' + authHeader)
  if (authHeader) {
    const token = await verify(authHeader.split(' ')[1], process.env.JWT_PRIVATE_KEY);

    if (!token)
      return NextResponse.next({
        status: 403,
        statusText: 'Bearer token invalid.'
      })

    // Add a new request header
    headers.append(USER_ID_HEADER_NAME, token.id)   
    // console.log(request.headers.get(USER_ID_HEADER_NAME)) 
  }

  const res = NextResponse.next({
    // New option `request.headers` which accepts a Headers object
    // overrides request headers with the specified new ones.
    request: {
      headers
    }
  });

  return res
}

/**
 * Middleware shall run on the routes listed below:
 */
export const config = {
  matcher: [
    '/api/course'
  ]
}