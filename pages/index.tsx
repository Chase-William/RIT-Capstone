import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Login from '../components/auth/login';
import SignUp from '../components/auth/sign-up';
import indexStyles from './index.module.css'
import { useState } from 'react';
import useUser from '../lib/userUser';
import fetchJson, { FetchError } from '../lib/fetchJson';

export default function Home() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectIfFound: true,
  })

  const [errorMsg, setErrorMsg] = useState('')

  return (
    <Layout>
      <div className={`${utilStyles.horizontal} ${indexStyles.evenly}`}>
        <Login
          onSubmit={async function handleSubmit(event) {
            event.preventDefault()

            const { username, password } = { // Get the username value from the form
              username: event.currentTarget.username.value,
              password: event.currentTarget.password.value
            }

            // console.log(`Username: ${username}`)
            // console.log(`Password ${password}`)

            try {
              mutateUser(
                await fetchJson('/api/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ username, password }),
                })
              )
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMsg(error.data.message)
              } else {
                console.error('An unexpected error happened:', error)
              }
            }
          }}
          errorMessage={errorMsg}
        />
        <SignUp />
      </div>
      {/* <Users users={users} /> */}
    </Layout>
    // <Layout home>
    //   {/* Keep the existing code here */}


    //   {/* Add this <section> tag below the existing <section> tag */}
    //   <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    //     <h2 className={utilStyles.headingLg}>Blog</h2>
    //     <ul className={utilStyles.list}>
    //       {allPostsData.map(({ id, date, title }) => (
    //         <li className={utilStyles.listItem} key={id}>
    //           {title}
    //           <br />
    //           {id}
    //           <br />
    //           {date}
    //         </li>
    //       ))}
    //     </ul>
    //   </section>
    // </Layout>
  );
}
