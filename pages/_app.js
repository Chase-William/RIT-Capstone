// `pages/_app.js`
import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SWRConfig } from 'swr'


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
