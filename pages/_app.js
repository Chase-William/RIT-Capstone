// `pages/_app.js`
import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SWRConfig } from 'swr'

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function App({ Component, pageProps }) {
  return (
    // <SWRConfig value={{fetcher}}>
    //   <NextUIProvider>
    //     <Component {...pageProps} />
    //   </NextUIProvider>
    // </SWRConfig>
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  
  )
}
