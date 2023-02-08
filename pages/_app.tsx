import '@/styles/globals.scss'

import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { Poppins } from '@next/font/google'
import { ChakraProvider } from '@chakra-ui/react'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}
