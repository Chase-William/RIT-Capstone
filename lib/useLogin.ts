import useSWR from 'swr'
import { User } from '../pages/api/user'
import { useEffect } from 'react'

export default function useLogin(
  username: string, 
  password: string,
  setIsLoading: (v: boolean) => void,
  setError: (v: Error) => void,
  setUser: (user: User) => void,
  setApiKey: (key: string) => void
  ) {
  const { data, error, isLoading } = useSWR<{ user: User, apiKey: string }>('/api/user')
  const { user, apiKey } = data

  useEffect(() => {
    if (isLoading)
      setIsLoading(true)
    else if (error)
      setError(error)
    else {
      setUser(user)
      setApiKey(apiKey)
    }
  }, [data, error, isLoading])
}