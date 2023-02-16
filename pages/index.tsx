import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Login from '../components/auth/login';
import Register from '../components/auth/register';
import indexStyles from './index.module.css'

export default function Home() {
  // here we just check if user is already logged in and redirect to profile
  // const { mutateUser } = useUser({
  //   redirectIfFound: true,
  // })
  // useLogin()

  // https://stackoverflow.com/questions/72221255/how-to-pass-data-from-one-page-to-another-page-in-next-js

  return (
    <Layout>
      <div className={`${utilStyles.horizontal} ${indexStyles.evenly}`}>
        <Login/>
        <Register/>
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
