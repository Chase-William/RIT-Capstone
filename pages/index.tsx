import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Login from '../components/auth/login';
import Register from '../components/auth/register';
import indexStyles from './index.module.css'
import { useState } from 'react';
import axios from 'axios';
import { User } from './api/user';

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home() {
  // here we just check if user is already logged in and redirect to profile
  // const { mutateUser } = useUser({
  //   redirectIfFound: true,
  // })
  // useLogin()

  const [ user, setUser ] = useState<User>()
  const [ apiKey, setApiKey ] = useState('')

  console.log(user)
  console.log(apiKey)

  const [loginErrorMsg, setLoginErrorMsg] = useState('')
  const [regErrorMsg, setRegErrorMsg] = useState('')

  return (
    <Layout>
      <div className={`${utilStyles.horizontal} ${indexStyles.evenly}`}>
        <Login setUser={setUser} setApiKey={setApiKey}/>
        <Register setUser={setUser} setApiKey={setApiKey}/>
      </div>
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
