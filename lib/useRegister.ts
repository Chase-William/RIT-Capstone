import Cookies from 'js-cookie'
import { post } from './fetch-wrapper'
import { User } from '../pages/api/user'

async function registerRequest(
  username: string, 
  password: string,
  email: string,
  role: string
  ): Promise<User> {
  return await post('api/auth/register', 
  {
    username: username,
    password: password,
    email: email,
    role: role
  })
    .then(data => data.user)
}

// Tried using a type then macro to remove duplicate type definitions, but wasn't worth the complexity and time investment
// to reach functionality, therefore:

/**
 * Register the user.
 * @returns A functional expression that can be used to register the user.
 */
export const useRegister = (): {
  register: {
    (username: string, password: string, email: string, role: string): Promise<User | undefined>
  }
} => {
  const register = async (username: string, password: string, email: string, role: string): Promise<User | undefined> => {
    const user = await registerRequest(username, password, email, role)
    if (user)
      Cookies.set('user', JSON.stringify(user))
    return user
  }

  return { register }
}