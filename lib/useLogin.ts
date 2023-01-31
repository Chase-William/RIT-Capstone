import Cookies from 'js-cookie'
import { post } from './fetch-wrapper'
import { User } from '../pages/api/user'
import { USER_COOKIE_NAME } from './util'

async function loginRequest(username: string, password: string): Promise<User> {
  return await post('/api/auth/login', {
    username: username,
    password: password
  })
  .then(data => data.user)
}

/**
 * Login the user.
 * @returns A functional expression that can be used to log the user in.
 */
export const useLogin = (): { 
  login: { 
    (username: string, password: string): Promise<User | undefined> 
  } 
} => {
  const login = async (username: string, password: string): Promise<User | undefined> => {
    const user = await loginRequest(username, password) as User
    if (user)
      Cookies.set(USER_COOKIE_NAME, JSON.stringify(user))
    return user
  }

  return { login }
}