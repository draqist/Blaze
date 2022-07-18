import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, } from '@chakra-ui/react'
import Theme from '../theme'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={Theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  ) 
}

export default MyApp
