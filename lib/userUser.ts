// import { useEffect } from 'react'
// import Router from 'next/router'
// import useSWR from 'swr'
// import { User } from '../pages/api/user'

// export default function useUser({
//   redirectIfFound = false,
// } = {}) {
//   const { data: { user, apiKey }, error, isLoading } = useSWR<{ user: User, apiKey: string }>('/api/user')

//   let redirectTo = '/courses'

//   console.log(user)

//   useEffect(() => {
//     // if no redirect needed, just return (example: already on /dashboard)
//     // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
//     if (!user) return

//     if (user.role === 'professor')
//       redirectTo = '/courses'
//     else if (user.role === 'admin')
//       redirectTo = '/accounts'
    
//     Router.push(redirectTo)  
//   }, [user, redirectIfFound])

//   return { user, mutateUser }
// }


// // import { useEffect } from 'react'
// // import Router from 'next/router'
// // import useSWR from 'swr'
// // import { User } from '../pages/api/user'

// export default function useUser({
//   redirectIfFound = false,
// } = {}) {
//   const { data: { user, apiKey }, mutate: mutateUser } = useSWR<{ user: User, apiKey: string }>('/api/user')

//   let redirectTo = '/courses'

//   console.log(user)

//   useEffect(() => {
//     // if no redirect needed, just return (example: already on /dashboard)
//     // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
//     if (!user) return

//     if (user.role === 'professor')
//       redirectTo = '/courses'
//     else if (user.role === 'admin')
//       redirectTo = '/accounts'

//     if (
//       // If redirectTo is set, redirect if the user was not found.
//       (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
//       // If redirectIfFound is also set, redirect if the user was found
//       (redirectIfFound && user?.isLoggedIn)
//     ) {
//       Router.push(redirectTo)
//     }
//   }, [user, redirectIfFound])

//   return { user, mutateUser }
// }
