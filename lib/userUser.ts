import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { User } from '../pages/api/user'

export default function useUser({
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')

  let redirectTo

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user) return

    if (user.role === 'prof')
      redirectTo = '/courses'
    else if (user.role === 'admin')
      redirectTo = '/accounts'

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound])

  return { user, mutateUser }
}
