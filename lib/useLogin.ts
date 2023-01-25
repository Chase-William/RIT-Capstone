import useSWR from 'swr'
import { ADMIN_ROLE, PROF_ROLE, User } from '../pages/api/user'
import { useEffect } from 'react'
import Router from 'next/router'

export let userInfo: User

export default function useLogin(
  username: string, 
  password: string,
  setIsLoading: (v: boolean) => void,
  setError: (v: Error) => void,
  setUser: (user: User) => void
  ) {
  const { data, error, isLoading } = useSWR<{ user: User, apiKey: string }>('/api/user')
  const { user } = data

  useEffect(() => {
    if (isLoading)
      setIsLoading(true)
    else if (error)
      setError(error)
    else {
      userInfo = user
      setUser(user)   
    }
  }, [data, error, isLoading])
}