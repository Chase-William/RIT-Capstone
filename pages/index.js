import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Login from '../components/auth/login';
import SignUp from '../components/auth/sign-up';
import Nav from '../components/nav';
import indexStyles from './index.module.css'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout>      
      <div className={`${utilStyles.horizontal} ${indexStyles.evenly}`}>
        <Login/>
        <SignUp/>
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
