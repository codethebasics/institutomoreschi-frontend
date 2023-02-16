import '@/styles/globals.scss'
// import 'rsuite/dist/rsuite.min.css'

import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { Poppins } from '@next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@/context/AuthContext'

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
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ChakraProvider>
    </>
  )
}
