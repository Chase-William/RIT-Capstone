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
import { ADMIN_ROLE, USER_COOKIE_NAME } from './lib/util'
import { User } from './pages/api/user'

export const USER_ID_HEADER_NAME = 'user-id'

// https://levelup.gitconnected.com/how-to-add-jwt-authentication-to-nextjs-apps-a0dc83bd257d
// How to use a cookie to have user information on every request

export async function middleware(request: NextRequest) {
  /*
  
  Implementation based off key concepts here:
    - https://github.com/vercel/next.js/pull/41380
    - https://levelup.gitconnected.com/how-to-add-jwt-authentication-to-nextjs-apps-a0dc83bd257d
    
  */

  // Ensure cookie is present
  if (!request.cookies.has(USER_COOKIE_NAME)) {
    return NextResponse.next({
      status: 400,
      statusText: 'Missing Cookie! This is needed for authentification purposes, try closing your browser and logging in again.'
    })
  }

  const user = JSON.parse(request.cookies.get(USER_COOKIE_NAME).value) as User

  // Check parse success and if logged in is true
  if (!user?.isLoggedIn) {
    return NextResponse.next({
      status: 400,
      statusText: 'Cookie parse failed or you are not logged in!'
    })
  }

  if (user.role !== ADMIN_ROLE && request.url.includes('accounts')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.rewrite(url)
  }

  // Parse the api key using our server's secret
  const token = await verify(user.apiKey, process.env.JWT_PRIVATE_KEY) as { id: number, exp: number }

  // Ensure token parsed
  if (!token) {
    return NextResponse.next({
      status: 403,
      statusText: 'Bearer token parse failed.'
    })
  }

  // Clone request headers
  const headers = new Headers(request.headers);

  // Add a new request header
  headers.append(USER_ID_HEADER_NAME, `${token.id}`)

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
    '/api/course',
    '/api/acquisition',
    '/api/login',
    '/api/user',
    '/courses',
    '/accounts'
  ]
}